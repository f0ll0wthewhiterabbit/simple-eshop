const mongoose = require('mongoose')

const { Schema } = mongoose

const ProductSchema = new Schema(
  {
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
  },
  {
    toObject: { getters: true },
    toJSON: { getters: true },
    timestamps: true,
  }
)

// Price getter
ProductSchema.path('price').get(num => (num / 100).toFixed(2))

// Price setter
ProductSchema.path('price').set(num => num * 100)

module.exports = mongoose.model('Product', ProductSchema)
