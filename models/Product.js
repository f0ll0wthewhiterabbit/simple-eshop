const mongoose = require('mongoose')

const { Schema } = mongoose

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        stars: {
          type: Number,
          min: 0,
          max: 5,
          required: true,
        },
      },
    ],
    required: true,
    default: [],
  },
  isRemovable: {
    type: Boolean,
    required: true,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Product', ProductSchema)
