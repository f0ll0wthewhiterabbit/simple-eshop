const express = require('express')
const auth = require('../../middleware/auth')
const formData = require('../../middleware/formData')
const validationMethods = require('../../constants/validationMethods')
const ProductsController = require('../../controllers/api/products')

const router = express.Router()

/**
 * @route   GET api/products?page=1&limit=3&filter=myRatings
 * @desc    Get products. Optional - page number, limit, filter=myRatings
 * @access  Private
 */
router.get('/', auth, ProductsController.getProducts)

/**
 * @route   POST api/products
 * @desc    Create new product
 * @access  Private - admin only
 */
router.post(
  '/',
  [auth, formData, ProductsController.validate(validationMethods.CREATE_PRODUCT)],
  ProductsController.createProduct
)

/**
 * @route   PATCH api/products/:id
 * @desc    Update product
 * @access  Private - mixed
 */
router.patch(
  '/:id',
  [auth, formData, ProductsController.validate(validationMethods.UPDATE_PRODUCT)],
  ProductsController.updateProduct
)

/**
 * @route   Delete api/products
 * @desc    Delete products
 * @access  Private - admin only
 */
router.delete(
  '/',
  [auth, ProductsController.validate(validationMethods.DELETE_PRODUCTS)],
  ProductsController.deleteProducts
)

/**
 * @route   GET api/products/:id
 * @desc    Get product
 * @access  Private - admin only
 */
router.get('/:id', auth, ProductsController.getProduct)

/**
 * @route   GET api/products/:id/rating?page=1&limit=3
 * @desc    Get product rating. Optional for ratings - page number, limit
 * @access  Private - admin only
 */
router.get('/:id/rating', auth, ProductsController.getProductRating)

/**
 * @route   GET api/products/:id/image
 * @desc    Get product image
 * @access  Public
 */
router.get('/:id/:imageName', ProductsController.getProductImage)

module.exports = router
