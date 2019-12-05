const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const roles = require('../../constants/roles')

const router = express.Router()

// @route   GET api/users
// @desc    Get users
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user || user.role !== roles.ADMIN) {
      return res.status(401).json({ errors: [{ msg: 'Forbidden' }] })
    }

    const users = await User.find().select('-password')

    return res.json(users)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
})

// @route   Delete api/users
// @desc    Delete users
// @access  Private
router.delete('/', auth, body().isArray(), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const user = await User.findById(req.user.id)

    if (!user || user.role !== roles.ADMIN) {
      return res.status(401).json({ errors: [{ msg: 'Forbidden' }] })
    }

    const idListToDelete = req.body
    const result = await User.deleteMany({ _id: { $in: idListToDelete } })

    return res.json({ deletedCount: result.deletedCount })
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
})

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('firstName', 'First name is required')
      .not()
      .isEmpty(),
    check('lastName', 'Last name is required')
      .not()
      .isEmpty(),
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

          return res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server error')
    }
  }
)

module.exports = router
