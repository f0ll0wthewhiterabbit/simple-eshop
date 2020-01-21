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
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post(
  '/',
  AuthController.validate(validationMethods.AUTHENTICATE_USER),
  AuthController.authenticateUser
)

module.exports = router
