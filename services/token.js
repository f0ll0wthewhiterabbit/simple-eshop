const Token = require('../models/Token')

exports.createToken = async userId => {
  try {
    const token = await new Token({
      user: userId,
    })
    await token.save()

    return token
  } catch (err) {
    throw Error('Error while creating token')
  }
}

exports.getToken = async tokenId => {
  try {
    const token = await Token.findById(tokenId)

    return token
  } catch (err) {
    throw Error('Error while getting token')
  }
}

exports.deleteToken = async tokenId => {
  try {
    const result = await Token.findByIdAndRemove(tokenId)

    return result
  } catch (err) {
    throw Error('Error while removing token')
  }
}
