const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const User = require('../../models/User')

const router = express.Router()

/**
 * @route   GET api/auth
 * @desc    Validate token and get user
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    return res.json(user)
  } catch (err) {
    console.err(err.message)
    return res.status(500).send('Server error')
  }
})

/**
 * @route   POST api/auth
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Unable to login' }] })
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password)

      if (!isPasswordMatch) {
        return res.status(400).json({ errors: [{ msg: 'Unable to login' }] })
      }

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
