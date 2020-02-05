const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserService = require('../../services/user')
const TokenService = require('../../services/token')
const validationMethods = require('../../constants/validationMethods')
const tokenUtils = require('../../utils/token')

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

  const { email, password, rememberMe } = req.body

  try {
    const user = await UserService.getUserByEmail(email, true)

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Unable to login' }] })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
      return res.status(400).json({ errors: [{ msg: 'Unable to login' }] })
    }

    const userId = user.id
    const result = {}

    if (rememberMe) {
      const token = await TokenService.createToken(userId)
      result.refreshToken = tokenUtils.generateRefreshToken(userId, token.id)
    }

    result.accessToken = tokenUtils.generateAccessToken(userId, rememberMe)

    return res.json({ ...result })
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
}

exports.refreshTokens = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  try {
    const { refreshToken } = req.body
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET)
    const { userId, tokenId } = decoded
    const user = await UserService.getUserById(userId)
    const token = await TokenService.getToken(tokenId)

    if (!user || !token) {
      throw Error()
    }

    const accessToken = tokenUtils.generateAccessToken(userId, true)
    const newRefreshToken = tokenUtils.generateRefreshToken(userId, tokenId)

    return res.json({
      accessToken,
      refreshToken: newRefreshToken,
    })
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ errors: [{ msg: 'Token expired' }] })
    }

    return res.status(401).json({ errors: [{ msg: 'Token is not valid' }] })
  }
}

exports.deleteToken = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  try {
    const { refreshToken } = req.body
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET)
    const { userId, tokenId } = decoded
    const user = await UserService.getUserById(userId)
    const token = await TokenService.getToken(tokenId)

    if (!user || !token) {
      throw Error()
    }

    await TokenService.deleteToken(tokenId)

    return res.sendStatus(204)
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ errors: [{ msg: 'Token expired' }] })
    }

    return res.status(401).json({ errors: [{ msg: 'Token is not valid' }] })
  }
}

exports.validate = method => {
  switch (method) {
    case validationMethods.AUTHENTICATE_USER: {
      return [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
        check('rememberMe', 'Remember me should be a boolean value').isBoolean(),
      ]
    }

    case validationMethods.REFRESH_TOKENS: {
      return [check('refreshToken', 'Refresh token is required').exists()]
    }

    case validationMethods.DELETE_TOKEN: {
      return [check('refreshToken', 'Refresh token is required').exists()]
    }

    default:
      break
  }
}
