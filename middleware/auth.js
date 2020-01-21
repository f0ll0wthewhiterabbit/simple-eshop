const jwt = require('jsonwebtoken')
const UserService = require('../services/user')

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({ errors: [{ msg: 'No token, authorization denied' }] })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await UserService.getUserById(decoded.user.id)

    req.user = user
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ errors: [{ msg: 'Token expired' }] })
    }

    if (err.name === 'CastError') {
      return res.status(401).json({ errors: [{ msg: 'Forbidden' }] })
    }

    return res.status(401).json({ errors: [{ msg: 'Token is not valid' }] })
  }
}
