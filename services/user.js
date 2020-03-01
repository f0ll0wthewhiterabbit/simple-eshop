const User = require('../models/User')

exports.getUsers = async (page, perPage, searchText) => {
  try {
    let partialTextSearchQuery

    if (searchText) {
      partialTextSearchQuery = {
        $or: [
          {
            firstName: {
              $regex: searchText,
              $options: 'i',
            },
          },
          {
            lastName: {
              $regex: searchText,
              $options: 'i',
            },
          },
          {
            email: {
              $regex: searchText,
              $options: 'i',
            },
          },
        ],
      }
    } else {
      partialTextSearchQuery = {}
    }

    const users = await User.find(partialTextSearchQuery)
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

exports.getNumberOfUsers = async searchText => {
  try {
    let query

    if (searchText) {
      query = {
        $or: [
          {
            firstName: {
              $regex: searchText,
              $options: 'i',
            },
          },
          {
            lastName: {
              $regex: searchText,
              $options: 'i',
            },
          },
          {
            email: {
              $regex: searchText,
              $options: 'i',
            },
          },
        ],
      }
    } else {
      query = {}
    }

    const numberOfUsers = await User.countDocuments(query)

    return numberOfUsers
  } catch (err) {
    throw Error('Error while calculating users')
  }
}

exports.getNumberOfRemovableUsers = async usersIdList => {
  try {
    const numberOfRemovableUsers = await User.countDocuments({
      _id: { $in: usersIdList },
      isRemovable: true,
    })

    return numberOfRemovableUsers
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
    let query

    if ('isRemovable' in fieldsToUpdate && fieldsToUpdate.isRemovable === true) {
      // automatic user deletion after 30 days
      const now = new Date()
      const expireDate = now.setSeconds(now.getSeconds() + 60 * 60 * 24 * 30)

      query = { $set: fieldsToUpdate, expireAt: expireDate }
    } else {
      query = { $set: fieldsToUpdate }
    }

    const updatedUser = await User.findByIdAndUpdate(id, { ...query }, { new: true })

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
