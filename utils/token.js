const jwt = require('jsonwebtoken')

exports.generateAccessToken = (userId, rememberMe) => {
  const accessTokenPayload = { userId }
  const options = { expiresIn: rememberMe ? '15m' : '2h' }

  return jwt.sign(accessTokenPayload, process.env.JWT_ACCESS_TOKEN_SECRET, options)
}

exports.generateRefreshToken = (userId, tokenId) => {
  const refreshTokenPayload = {
    tokenId,
    userId,
  }
  const options = { expiresIn: '60 days' }

  return jwt.sign(refreshTokenPayload, process.env.JWT_REFRESH_TOKEN_SECRET, options)
}
