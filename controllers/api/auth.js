const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserService = require('../../services/user')
const validationMethods = require('../../constants/validationMethods')

exports.validateUser = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.user.id)

    return res.json(user)
  } catch (err) {
    console.err(err.message)
    return res.status(500).send('Server error')
  }
}

exports.authenticateUser = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    const user = await UserService.getUserByEmail(email, true)

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

exports.validate = method => {
  switch (method) {
    case validationMethods.AUTHENTICATE_USER: {
      return [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
      ]
    }

    default:
      break
  }
}
