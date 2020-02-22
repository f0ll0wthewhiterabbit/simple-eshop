const mongoose = require('mongoose')
const roles = require('../constants/roles')

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isRemovable: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      required: true,
      default: roles.USER,
      enum: [roles.ADMIN, roles.USER, roles.GUEST],
    },
    expireAt: {
      type: Date,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })

module.exports = mongoose.model('User', UserSchema)
