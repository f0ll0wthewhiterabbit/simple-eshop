const { body, check, validationResult } = require('express-validator')
const sharp = require('sharp')
const ProductService = require('../../services/product')
const validationMethods = require('../../constants/validationMethods')
const roles = require('../../constants/roles')

exports.getProducts = async (req, res) => {
  try {
    const DEFAULT_ITEMS_PER_PAGE = 9

    const userId = req.user._id
    const queryPage = req.query.page
    const queryLimit = req.query.limit
    const queryFilter = req.query.filter
    const isRatingFilter = queryFilter && queryFilter === 'myRatings'
    const total = await ProductService.getNumberOfProducts(isRatingFilter ? userId : undefined)
    const page = queryPage ? parseInt(queryPage, 10) : 1

    let perPage

    if (queryPage || queryLimit) {
      perPage = parseInt(queryLimit, 10) || DEFAULT_ITEMS_PER_PAGE
    } else {
      perPage = total
    }

    const totalPages = Math.ceil(total / perPage)
    const products = await ProductService.getProducts(page, perPage, userId, isRatingFilter)

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
}

exports.getProduct = async (req, res) => {
  try {
    if (req.user.role !== roles.ADMIN) {
      return res.status(401).json({ errors: [{ msg: 'Forbidden' }] })
    }

    const product = await ProductService.getProduct(req.params.id)

    res.json(product)
  } catch (err) {
    console.error(err)

    if (err.name === 'CastError') {
      return res.status(400).json({ errors: [{ msg: 'Invalid request params' }] })
    }

    return res.status(500).send('Server error')
  }
}

exports.getProductRating = async (req, res) => {
  try {
    if (req.user.role !== roles.ADMIN) {
      return res.status(401).json({ errors: [{ msg: 'Forbidden' }] })
    }

    const DEFAULT_ITEMS_PER_PAGE = 10

    const productId = req.params.id
    const queryPage = req.query.page
    const queryLimit = req.query.limit
    const total = await ProductService.getNumberOfProductRatings(productId)
    const page = queryPage ? parseInt(queryPage, 10) : 1
    let perPage

    if (queryPage || queryLimit) {
      perPage = parseInt(queryLimit, 10) || DEFAULT_ITEMS_PER_PAGE
    } else {
      perPage = total
    }

    const totalPages = Math.ceil(total / perPage)
    const skip = page === 1 ? 0 : page * perPage - perPage

    const productData = await ProductService.getProductRating(productId, skip, perPage)

    return res.json({
      page,
      perPage,
      total,
      totalPages,
      data: productData,
    })
  } catch (err) {
    console.error(err)

    if (err.name === 'CastError') {
      return res.status(400).json({ errors: [{ msg: 'Invalid request params' }] })
    }

    return res.status(500).send('Server error')
  }
}

exports.getProductImage = async (req, res) => {
  try {
    const image = await ProductService.getProductImage(req.params.id)

    if (!image) {
      return res.status(404).json({ errors: [{ msg: 'There is no image for this product' }] })
    }

    res.set('Content-Type', 'image/jpeg')
    res.send(image)
  } catch (err) {
    console.error(err)

    if (err.name === 'CastError') {
      return res.status(400).json({ errors: [{ msg: 'Invalid request params' }] })
    }

    return res.status(500).send('Server error')
  }
}

exports.createProduct = async (req, res) => {
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

    const productData = {
      title,
      price,
      description,
      tags: tags ? tags.split(',') : [],
      image: buffer,
    }
    const product = await ProductService.createProduct(productData, req.user.id)

    return res.status(201).json(product)
  } catch (err) {
    console.error(err.message)

    if (err.name === 'CastError') {
      return res.status(400).json({ errors: [{ msg: 'Invalid request params' }] })
    }

    return res.status(500).send('Server error')
  }
}

exports.updateProduct = async (req, res) => {
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

    if (req.files && req.files.length > 0) {
      const image = req.files[0]
      const buffer = await sharp(image.buffer)
        .resize({ width: 400, height: 225 })
        .jpeg()
        .toBuffer()

      productFields.image = buffer
      productFields.imageName = image.originalname
    }

    const productId = req.params.id
    const product = await ProductService.getProduct(productId)

    if (stars || stars === 0) {
      const productRating = product.rating
      const userRatingIndex = product.rating.findIndex(rating => rating.user.toString() === userId)

      if (userRatingIndex !== -1) {
        if (stars === 0) {
          productRating.splice(userRatingIndex, 1)
        } else {
          productRating[userRatingIndex].stars = stars
        }
      } else {
        productRating.push({
          user: userId,
          stars,
        })
      }

      productFields.rating = productRating
    }

    const updatedProduct = await ProductService.updateProduct(productId, productFields, userId)

    return res.json(updatedProduct)
  } catch (err) {
    console.error(err.message)

    if (err.name === 'CastError') {
      return res.status(400).json({ errors: [{ msg: 'Invalid request params' }] })
    }

    return res.status(500).send('Server error')
  }
}

exports.deleteProducts = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    if (req.user.role !== roles.ADMIN) {
      return res.status(401).json({ errors: [{ msg: 'Forbidden' }] })
    }

    const idListToDelete = req.body
    const numberOfRemovableProducts = await ProductService.getNumberOfRemovableProducts(
      idListToDelete
    )

    if (idListToDelete.length !== numberOfRemovableProducts) {
      return res.status(400).json({ errors: [{ msg: 'The requested products cannot be deleted' }] })
    }

    const deletedProductsAmount = await ProductService.deleteProducts(idListToDelete)

    return res.json({ deletedCount: deletedProductsAmount })
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
}

exports.validate = method => {
  switch (method) {
    case validationMethods.CREATE_PRODUCT: {
      return [
        check('title', 'Title is required').notEmpty(),
        check('price', 'Please include a numeric price')
          .exists()
          .withMessage('Please include price')
          .isNumeric()
          .withMessage('Price should be numeric')
          .matches(/^\d+(\.\d{1,2})?$/)
          .withMessage('Price can be float and include no more than two characters after dot'),
        check('description', 'Description is required').notEmpty(),
      ]
    }

    case validationMethods.UPDATE_PRODUCT: {
      return [
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
      ]
    }

    case validationMethods.DELETE_PRODUCTS: {
      return [body().isArray()]
    }

    default:
      return () => {}
  }
}
