const express = require('express')
const { body, check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const Product = require('../../models/Product')
const User = require('../../models/User')
const roles = require('../../constants/roles')

const router = express.Router()

/**
 * @route   GET api/products
 * @desc    Get products
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(401).json({ errors: [{ msg: 'Forbidden' }] })
    }

    const products = await Product.find().sort('-createdAt')

    return res.json(products)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
})

/**
 * @route   POST api/products
 * @desc    Create new post
 * @access  Private
 */
router.post(
  '/',
  [
    auth,
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('price', 'Please include a numeric price')
      .exists()
      .withMessage('Please include price')
      .isNumeric()
      .withMessage('Price should be numeric')
      .matches(/^\d+(\.\d{1,2})?$/)
      .withMessage('Price can be float and include no more than two characters after dot'),
    check('description', 'Description is required')
      .not()
      .isEmpty(),
    check('tags', 'Tags should be an array').isArray(),
    check('image', 'Please include a correct image url')
      .exists()
      .isURL(),
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const { title, price, description, tags, image } = req.body

    try {
      const user = await User.findById(req.user.id)

      if (!user || user.role !== roles.ADMIN) {
        return res.status(401).json({ errors: [{ msg: 'Forbidden' }] })
      }

      const product = new Product({
        title,
        price,
        description,
        tags,
        image,
      })
      await product.save()

      return res.status(201).json(product)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server error')
    }
  }
)

/**
 * @route   PATCH api/products
 * @desc    Update post
 * @access  Private
 */
router.patch(
  '/:id',
  [
    auth,
    check('title', 'Title should not be empty')
      .optional()
      .not()
      .isEmpty(),
    check('price', 'Price should be a numer')
      .optional()
      .isNumeric(),
    check('description', 'Description should not be empty')
      .optional()
      .not()
      .isEmpty(),
    check('tags', 'Tags should be an array')
      .optional()
      .isArray(),
    check('image', 'Please include a correct image url')
      .optional()
      .isURL(),
    check('stars', 'Stars should be an integer numer between 0 and 5')
      .optional()
      .isInt({ min: 0, max: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const { title, price, description, tags, image, stars } = req.body
    const productFields = {}

    if (title) {
      productFields.title = title
    }

    if (price) {
      productFields.price = price
    }

    if (description) {
      productFields.description = description
    }

    if (tags) {
      productFields.tags = tags
    }

    if (image) {
      productFields.image = image
    }

    try {
      const user = await User.findById(req.user.id)

      if (!user) {
        return res.status(401).json({ errors: [{ msg: 'Forbidden' }] })
      }

      if ((title || price || description || tags || image) && user.role !== roles.ADMIN) {
        return res.status(401).json({ errors: [{ msg: 'Forbidden' }] })
      }

      const productId = req.params.id
      const product = await Product.findById(productId)

      if (!product) {
        return res.status(400).json({ errors: [{ msg: 'Invalid request params' }] })
      }

      if (stars || stars === 0) {
        const productRating = product.rating
        const userRatingIndex = product.rating.findIndex(
          rating => rating.userId.toString() === user.id
        )

        if (userRatingIndex !== -1) {
          if (stars === 0) {
            productRating.splice(userRatingIndex, 1)
          } else {
            productRating[userRatingIndex].stars = stars
          }
        } else {
          productRating.push({
            userId: user.id,
            stars,
          })
        }

        productFields.rating = productRating
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: productFields },
        { new: true }
      )

      return res.json(updatedProduct)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server error')
    }
  }
)

/**
 * @route   Delete api/products
 * @desc    Delete products
 * @access  Private
 */
router.delete('/', [auth, body().isArray()], async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const user = await User.findById(req.user.id)

    if (!user || user.role !== roles.ADMIN) {
      return res.status(401).json({ errors: [{ msg: 'Forbidden' }] })
    }

    const idListToDelete = req.body
    const productsAmount = await Product.countDocuments({ _id: { $in: idListToDelete } })

    if (idListToDelete.length !== productsAmount) {
      return res.status(400).json({ errors: [{ msg: 'The requested products cannot be deleted' }] })
    }

    const result = await Product.deleteMany({ _id: { $in: idListToDelete } })

    return res.json({ deletedCount: result.deletedCount })
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
})

module.exports = router
