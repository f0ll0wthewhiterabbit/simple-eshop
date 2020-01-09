const express = require('express')
const { body, check, validationResult } = require('express-validator')
const sharp = require('sharp')
const auth = require('../../middleware/auth')
const formData = require('../../middleware/formData')
const Product = require('../../models/Product')
const roles = require('../../constants/roles')

const router = express.Router()

/**
 * @route   GET api/products?page=1&limit=3
 * @desc    Get products. Optional - page number and limit
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const DEFAULT_ITEMS_PER_PAGE = 9
    const queryPage = req.query.page
    const total = await Product.estimatedDocumentCount()
    const page = queryPage ? parseInt(queryPage, 10) : 1
    const perPage = queryPage ? parseInt(req.query.limit, 10) || DEFAULT_ITEMS_PER_PAGE : total
    const totalPages = Math.ceil(total / perPage)
    const products = await Product.find()
      .skip(page === 1 ? 0 : page * perPage - perPage)
      .limit(perPage)
      .select('-image')
      .select('-__v')
      .sort('-createdAt')

    return res.json({
      page,
      perPage,
      total,
      totalPages,
      data: products,
    })
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
})

/**
 * @route   POST api/products
 * @desc    Create new product
 * @access  Private
 */
router.post(
  '/',
  [
    auth,
    formData,
    check('title', 'Title is required').notEmpty(),
    check('price', 'Please include a numeric price')
      .exists()
      .withMessage('Please include price')
      .isNumeric()
      .withMessage('Price should be numeric')
      .matches(/^\d+(\.\d{1,2})?$/)
      .withMessage('Price can be float and include no more than two characters after dot'),
    check('description', 'Description is required').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const { title, price, description, tags } = req.body
    const image = req.files[0]

    try {
      if (req.user.role !== roles.ADMIN) {
        return res.status(401).json({ errors: [{ msg: 'Forbidden' }] })
      }

      const buffer = await sharp(image.buffer)
        .resize({ width: 400, height: 225 })
        .jpeg()
        .toBuffer()

      const product = new Product({
        title,
        price,
        description,
        tags: tags ? tags.split(',') : [],
        image: buffer,
        imageName: image.originalname,
      })
      await product.save()

      const productWithoutImage = product.getPublicFields()

      return res.status(201).json(productWithoutImage)
    } catch (err) {
      console.error(err.message)

      if (err.name === 'CastError') {
        return res.status(400).json({ errors: [{ msg: 'Invalid request params' }] })
      }

      return res.status(500).send('Server error')
    }
  }
)

/**
 * @route   PATCH api/products/:id
 * @desc    Update product
 * @access  Private
 */
router.patch(
  '/:id',
  [
    auth,
    formData,
    check('title', 'Title should not be empty')
      .optional()
      .notEmpty(),
    check('price', 'Price should be a numer')
      .optional()
      .isNumeric()
      .withMessage('Price should be numeric')
      .matches(/^\d+(\.\d{1,2})?$/)
      .withMessage('Price can be float and include no more than two characters after dot'),
    check('description', 'Description should not be empty')
      .optional()
      .notEmpty(),
    check('stars', 'Stars should be an integer numer between 0 and 5')
      .optional()
      .isInt({ min: 0, max: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const { user } = req
    const userId = user.id
    const { title, price, description, tags, stars } = req.body
    const productFields = {}

    try {
      if ((title || price || description || tags || req.files) && user.role !== roles.ADMIN) {
        return res.status(401).json({ errors: [{ msg: 'Forbidden' }] })
      }

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
        productFields.tags = tags.split(',')
      }

      if (tags === '') {
        productFields.tags = []
      }

      if (req.files) {
        const image = req.files[0]
        const buffer = await sharp(image.buffer)
          .resize({ width: 400, height: 225 })
          .jpeg()
          .toBuffer()

        productFields.image = buffer
        productFields.imageName = image.originalname
      }

      const productId = req.params.id
      const product = await Product.findById(productId)

      if (stars || stars === 0) {
        const productRating = product.rating
        const userRatingIndex = product.rating.findIndex(
          rating => rating.userId.toString() === userId
        )

        if (userRatingIndex !== -1) {
          if (stars === 0) {
            productRating.splice(userRatingIndex, 1)
          } else {
            productRating[userRatingIndex].stars = stars
          }
        } else {
          productRating.push({
            userId,
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

      const productWithoutImage = updatedProduct.getPublicFields()

      return res.json(productWithoutImage)
    } catch (err) {
      console.error(err.message)

      if (err.name === 'CastError') {
        return res.status(400).json({ errors: [{ msg: 'Invalid request params' }] })
      }

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
    if (req.user.role !== roles.ADMIN) {
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

/**
 * @route   GET api/products/:id/image
 * @desc    Get product image
 * @access  Public
 */
router.get('/:id/:imageName', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product.image) {
      return res.status(404).json({ errors: [{ msg: 'There is no image for this product' }] })
    }

    res.set('Content-Type', 'image/jpeg')
    res.send(product.image)
  } catch (err) {
    console.error(err)

    if (err.name === 'CastError') {
      return res.status(400).json({ errors: [{ msg: 'Invalid request params' }] })
    }

    return res.status(500).send('Server error')
  }
})

module.exports = router
