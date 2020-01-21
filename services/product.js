const Product = require('../models/Product')

exports.getProducts = async (page, perPage, userId, isRatingFilter = false) => {
  try {
    const filter = isRatingFilter ? { rating: { $elemMatch: { user: userId } } } : {}
    const products = await Product.aggregate([
      { $match: filter },
      { $sort: { createdAt: -1 } },
      { $skip: page === 1 ? 0 : page * perPage - perPage },
      { $limit: perPage },
      {
        $addFields: {
          ratingInfo: {
            average: { $avg: '$rating.stars' },
            votesAmount: { $size: '$rating.stars' },
            currentUserRating: {
              $filter: {
                input: '$rating',
                as: 'item',
                cond: { $eq: ['$$item.user', userId] },
              },
            },
          },
        },
      },
      {
        $project: {
          title: '$title',
          description: '$description',
          price: '$price',
          imageName: '$imageName',
          tags: '$tags',
          createdAt: '$createdAt',
          updatedAt: '$updatedAt',
          ratingInfo: {
            average: '$ratingInfo.average',
            votesAmount: '$ratingInfo.votesAmount',
            currentUserRating: {
              $arrayElemAt: ['$ratingInfo.currentUserRating.stars', 0],
            },
          },
        },
      },
    ])

    // Cents to dollars conversion
    const productsWithChangedPrices = products.map(product => ({
      ...product,
      price: Number((product.price / 100).toFixed(2)),
    }))

    return productsWithChangedPrices
  } catch (err) {
    throw Error('Error while getting products')
  }
}

exports.getProduct = async productId => {
  try {
    const product = await Product.findById(productId).select('-image -__v')

    return product
  } catch (err) {
    throw Error('Error while getting product')
  }
}

exports.getNumberOfProducts = async userId => {
  try {
    const filter = userId ? { rating: { $elemMatch: { user: userId } } } : {}
    const numberOfProducts = await Product.countDocuments({ ...filter })

    return numberOfProducts
  } catch (err) {
    throw Error('Error while calculating products')
  }
}

exports.getNumberOfRemovableProducts = async productsIdList => {
  try {
    const numberOfRemovableProducts = await Product.countDocuments({ _id: { $in: productsIdList } })

    return numberOfRemovableProducts
  } catch (err) {
    throw Error('Error while calculating removable products')
  }
}

exports.getNumberOfProductRatings = async productId => {
  try {
    const product = await Product.findById(productId).select(
      '-tags -imageName -image -price -description -__v'
    )
    const numberOfProductRatings = product.rating.length

    return numberOfProductRatings
  } catch (err) {
    throw Error('Error while calculating number of product ratings')
  }
}

exports.getProductRating = async (productId, skip, perPage) => {
  try {
    const productData = await Product.findById(productId)
      .populate('rating.user', 'firstName lastName email')
      .slice('rating', [skip, perPage])
      .select('-tags -imageName -image -price -description -__v')

    return productData
  } catch (err) {
    throw Error('Error while getting product rating data')
  }
}

exports.getProductImage = async productId => {
  try {
    const product = await Product.findById(productId)

    return product.image
  } catch (err) {
    throw Error('Error while getting product image')
  }
}

exports.createProduct = async (productData, userId) => {
  try {
    const { title, price, description, tags, image } = productData
    const product = new Product({
      title,
      price,
      description,
      tags: tags || [],
      image,
      imageName: image.originalname,
    })
    await product.save()

    const productWithoutImage = product.getPublicFields(userId)

    return productWithoutImage
  } catch (err) {
    throw Error('Error while creating product')
  }
}

exports.updateProduct = async (productId, fieldsToUpdate, userId) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: fieldsToUpdate },
      { new: true }
    )

    const productWithoutImage = updatedProduct.getPublicFields(userId)

    return productWithoutImage
  } catch (err) {
    throw Error('Error while updating product')
  }
}

exports.deleteProducts = async productsIdList => {
  try {
    const result = await Product.deleteMany({ _id: { $in: productsIdList } })

    return result.deletedCount
  } catch (err) {
    throw Error('Error while removing product')
  }
}
