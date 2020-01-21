const User = require('../models/User')

exports.getUsers = async (page, perPage) => {
  try {
    const users = await User.find()
      .skip(page === 1 ? 0 : page * perPage - perPage)
      .limit(perPage)
      .select('-password -__v')
      .sort('-createdAt')

    return users
  } catch (err) {
    throw Error('Error while getting users')
  }
}

exports.getUserByEmail = async (email, withPassword = false) => {
  try {
    const user = await User.findOne({ email }).select(withPassword ? '-__v' : '-password -__v')

    return user
  } catch (err) {
    throw Error('Error while getting user by email')
  }
}

exports.getUserById = async userId => {
  try {
    const user = await User.findById(userId).select('-password')

    return user
  } catch (err) {
    throw Error('Error while getting user by id')
  }
}

exports.getNumberOfUsers = async () => {
  try {
    const numberOfUsers = await User.estimatedDocumentCount()

    return numberOfUsers
  } catch (err) {
    throw Error('Error while calculating users')
  }
}

exports.getNumberOfRemovableUsers = async usersIdList => {
  try {
    const numberOfRemobableUsers = await User.countDocuments({
      _id: { $in: usersIdList },
      isRemovable: true,
    })

    return numberOfRemobableUsers
  } catch (err) {
    throw Error('Error while calculating removable users')
  }
}

exports.createUser = async (firstName, lastName, email, password) => {
  try {
    const user = await new User({
      firstName,
      lastName,
      email,
      password,
    })
    await user.save()

    return user
  } catch (err) {
    throw Error('Error while creating user')
  }
}

exports.updateUser = async (id, fieldsToUpdate) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { $set: fieldsToUpdate }, { new: true })

    return updatedUser
  } catch (err) {
    throw Error('Error while updating user')
  }
}

exports.deleteUsers = async usersIdList => {
  try {
    const result = await User.deleteMany({ _id: { $in: usersIdList }, isRemovable: true })

    return result.deletedCount
  } catch (err) {
    throw Error('Error while removing users')
  }
}
