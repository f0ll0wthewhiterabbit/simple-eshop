const { body, check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const UserService = require('../../services/user')
const EmailService = require('../../services/email')
const roles = require('../../constants/roles')
const validationMethods = require('../../constants/validationMethods')
const tokenUtils = require('../../utils/token')

exports.getUsers = async (req, res) => {
  try {
    if (req.user.role !== roles.ADMIN) {
      return res.status(401).json({ errors: [{ msg: 'Forbidden' }] })
    }

    const DEFAULT_ITEMS_PER_PAGE = 9
    const queryPage = req.query.page
    const searchText = req.query.q
    const total = await UserService.getNumberOfUsers(searchText)
    const page = queryPage ? parseInt(queryPage, 10) : 1
    const perPage = queryPage ? parseInt(req.query.limit, 10) || DEFAULT_ITEMS_PER_PAGE : total
    const totalPages = Math.ceil(total / perPage)
    const users = await UserService.getUsers(page, perPage, searchText)

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
}

exports.createUser = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { firstName, lastName, email, password } = req.body

  try {
    let user = await UserService.getUserByEmail(email)

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
    }

    const salt = await bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    user = await UserService.createUser(firstName, lastName, email, hashedPassword)

    if (process.env.NODE_ENV === 'production') {
      await EmailService.sendRegistrationEmail(user)
    }

    const accessToken = tokenUtils.generateAccessToken(user.id, false)

    return res.status(201).json({ accessToken })
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
}

exports.updateUser = async (req, res) => {
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

      if (process.env.NODE_ENV === 'production') {
        await EmailService.sendDeleteAccountEmail(req.user.email)
      }
    }

    const updatedUser = await UserService.updateUser(req.user.id, userFields)

    return res.json(updatedUser)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
}

exports.deleteUsers = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    if (req.user.role !== roles.ADMIN) {
      return res.status(401).json({ errors: [{ msg: 'Forbidden' }] })
    }

    const idListToDelete = req.body
    const numberOfRemovableUsers = await UserService.getNumberOfRemovableUsers(idListToDelete)

    if (idListToDelete.length !== numberOfRemovableUsers) {
      return res.status(400).json({ errors: [{ msg: 'The requested users cannot be deleted' }] })
    }

    const deletedUsersAmount = await UserService.deleteUsers(idListToDelete)

    return res.json({ deletedCount: deletedUsersAmount })
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
}

exports.validate = method => {
  switch (method) {
    case validationMethods.CREATE_USER: {
      return [
        check('firstName', 'First name is required').notEmpty(),
        check('lastName', 'Last name is required').notEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
      ]
    }

    case validationMethods.UPDATE_USER: {
      return [
        check('firstName', 'First name is required')
          .optional()
          .notEmpty(),
        check('lastName', 'Last name is required')
          .optional()
          .notEmpty(),
      ]
    }

    case validationMethods.DELETE_USERS: {
      return [body().isArray()]
    }

    default:
      break
  }
}
