const express = require('express')
const auth = require('../../middleware/auth')
const validationMethods = require('../../constants/validationMethods')
const UsersController = require('../../controllers/api/users')

const router = express.Router()

/**
 * @route   GET api/users?page=1&limit=3&q=text
 * @desc    Get users. Optional - page number, limit, q
 *            q - query for partial text search by firstName, lastName & email
 * @access  Private - admin only
 */
router.get('/', auth, UsersController.getUsers)

/**
 * @route   POST api/users
 * @desc    Register user
 * @access  Public
 */
router.post(
  '/',
  UsersController.validate(validationMethods.CREATE_USER),
  UsersController.createUser
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
  [auth, UsersController.validate(validationMethods.UPDATE_USER)],
  UsersController.updateUser
)

/**
 * @route   Delete api/users
 * @desc    Delete users
 * @access  Private - admin only
 */
router.delete(
  '/',
  [auth, UsersController.validate(validationMethods.DELETE_USERS)],
  UsersController.deleteUsers
)

module.exports = router
