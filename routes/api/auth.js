const express = require('express')
const auth = require('../../middleware/auth')
const validationMethods = require('../../constants/validationMethods')
const AuthController = require('../../controllers/api/auth')

const router = express.Router()

/**
 * @route   GET api/auth
 * @desc    Validate token and get user
 * @access  Private
 */
router.get('/', auth, AuthController.validateUser)

/**
 * @route   POST api/auth
 * @desc    Authenticate user & get token(s)
 * @access  Public
 */
router.post(
  '/',
  AuthController.validate(validationMethods.AUTHENTICATE_USER),
  AuthController.authenticateUser
)

/**
 * @route   POST api/auth/token
 * @desc    Refresh tokens
 * @access  Public
 */
router.post(
  '/token',
  AuthController.validate(validationMethods.REFRESH_TOKENS),
  AuthController.refreshTokens
)

/**
 * @route   POST api/auth/token
 * @desc    Delete refresh token
 * @access  Private
 */
router.delete(
  '/token',
  [auth, AuthController.validate(validationMethods.DELETE_TOKEN)],
  AuthController.deleteToken
)

module.exports = router
