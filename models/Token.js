const mongoose = require('mongoose')

const { Schema } = mongoose

const TokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Token', TokenSchema)
