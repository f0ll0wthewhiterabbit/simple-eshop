const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const roles = require('../../constants/roles')

const router = express.Router()

/**
 * @route   GET api/users?page=1&limit=3
 * @desc    Get users. Optional - page number and limit
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== roles.ADMIN) {
      return res.status(401).json({ errors: [{ msg: 'Forbidden' }] })
    }

    const DEFAULT_ITEMS_PER_PAGE = 9
    const queryPage = req.query.page
    const total = await User.estimatedDocumentCount()
    const page = queryPage ? parseInt(queryPage, 10) : 1
    const perPage = queryPage ? parseInt(req.query.limit, 10) || DEFAULT_ITEMS_PER_PAGE : total
    const totalPages = Math.ceil(total / perPage)
    const users = await User.find()
      .skip(page === 1 ? 0 : page * perPage - perPage)
      .limit(perPage)
      .select('-password')
      .select('-__v')
      .sort('-createdAt')

    return res.json({
      page,
      perPage,
      total,
      totalPages,
      data: users,
    })
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
})

/**
 * @route   POST api/users
 * @desc    Register user
 * @access  Public
 */
router.post(
  '/',
  [
    check('firstName', 'First name is required').notEmpty(),
    check('lastName', 'Last name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const { firstName, lastName, email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
      }

      const salt = await bcrypt.genSaltSync(10)
      const hash = await bcrypt.hash(password, salt)

      user = new User({
        firstName,
        lastName,
        email,
        password: hash,
      })
      await user.save()

      const payload = {
        user: {
          id: user.id,
        },
      }

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: Number(process.env.JWT_TOKEN_LIFETIME) },
        (err, token) => {
          if (err) {
            throw err
          }

          return res.status(201).json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server error')
    }
  }
)

/**
 * @route   PATCH api/users
 * @desc    Update user. Can be with or without req.body:
 *            1) With payload - change user firstName & lastName
 *            2) Without payload - change isRemovable user field to true
 * @access  Private
 */
router.patch(
  '/',
  [
    auth,
    check('firstName', 'First name is required')
      .optional()
      .notEmpty(),
    check('lastName', 'Last name is required')
      .optional()
      .notEmpty(),
  ],
  async (req, res) => {
    const userData = req.body
    const userFields = {}
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    if (userData.firstName) {
      userFields.firstName = userData.firstName
    }

    if (userData.lastName) {
      userFields.lastName = userData.lastName
    }

    try {
      if (!userData.firstName && !userData.lastName) {
        if (req.user.isRemovable) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Delete account request has already been sent' }] })
        }

        userFields.isRemovable = true
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { $set: userFields },
        { new: true }
      )

      return res.json(updatedUser)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server error')
    }
  }
)

/**
 * @route   Delete api/users
 * @desc    Delete users
 * @access  Private
 */
router.delete('/', [auth, body().isArray()], async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    if (req.user.role !== roles.ADMIN) {
      return res.status(401).json({ errors: [{ msg: 'Forbidden' }] })
    }

    const idListToDelete = req.body
    const usersAmount = await User.countDocuments({
      _id: { $in: idListToDelete },
      isRemovable: true,
    })

    if (idListToDelete.length !== usersAmount) {
      return res.status(400).json({ errors: [{ msg: 'The requested users cannot be deleted' }] })
    }

    const result = await User.deleteMany({ _id: { $in: idListToDelete }, isRemovable: true })

    return res.json({ deletedCount: result.deletedCount })
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
})

module.exports = router
