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
      type: Buffer,
      required: true,
    },
    imageName: {
      type: String,
      required: true,
      default: 'image',
    },
    rating: {
      type: [
        {
          user: {
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

ProductSchema.methods.getPublicFields = function(currentUserId) {
  const productObject = this.toObject()

  const ratings = productObject.rating
  const votesAmount = ratings.length
  let averageRating

  if (votesAmount > 0) {
    averageRating = Math.round(ratings.reduce((a, b) => a + b.stars, 0) / votesAmount)
  } else {
    averageRating = null
  }

  const currentUserRating = ratings.find(it => it.user.toString() === currentUserId)
  productObject.ratingInfo = {}

  if (currentUserRating) {
    productObject.ratingInfo.currentUserRating = currentUserRating.stars
  }

  productObject.ratingInfo.average = averageRating
  productObject.ratingInfo.votesAmount = votesAmount
  delete productObject.rating
  delete productObject.image
  delete productObject.__v

  return productObject
}

// Price getter
ProductSchema.path('price').get(num => Number((num / 100).toFixed(2)))

// Price setter
ProductSchema.path('price').set(num => num * 100)

module.exports = mongoose.model('Product', ProductSchema)
