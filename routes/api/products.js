const express = require('express')

const router = express.Router()

// @route   GET api/products
// @desc    Products route
// @access  Public
router.get('/', (req, res) => res.send('Products route'))

module.exports = router
