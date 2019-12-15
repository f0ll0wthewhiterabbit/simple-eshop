import { createActions } from 'redux-actions'

const { products } = createActions({
  PRODUCTS: {
    FETCH_PRODUCTS: undefined,
    FETCH_PRODUCTS_SUCCESS: productsList => ({ productsList }),
    FETCH_PRODUCTS_ERROR: error => ({ error }),
    SET_SELECTED_PRODUCTS: selectedProductsList => ({ selectedProductsList }),
    DELETE_PRODUCTS: undefined,
    DELETE_PRODUCTS_SUCCESS: deletedProducts => ({ deletedProducts }),
    DELETE_PRODUCTS_ERROR: error => ({ error }),
    CHANGE_PRODUCT_RATING: ratingData => ({ ratingData }),
    CHANGE_PRODUCT_RATING_SUCCESS: product => ({ product }),
    CHANGE_PRODUCT_RATING_ERROR: id => ({ id }),
    DELETE_PRODUCT_RATING: productId => ({ productId }),
    DELETE_PRODUCT_RATING_SUCCESS: product => ({ product }),
    DELETE_PRODUCT_RATING_ERROR: id => ({ id }),
    ADD_PRODUCT: (productData, history) => ({ productData, history }),
    ADD_PRODUCT_SUCCESS: product => ({ product }),
    ADD_PRODUCT_ERROR: error => ({ error }),
    START_RATING_LOADING: id => ({ id }),
  },
})

export const {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsError,
  setSelectedProducts,
  deleteProducts,
  deleteProductsSuccess,
  deleteProductsError,
  changeProductRating,
  changeProductRatingSuccess,
  changeProductRatingError,
  deleteProductRating,
  deleteProductRatingSuccess,
  deleteProductRatingError,
  addProduct,
  addProductSuccess,
  addProductError,
  startRatingLoading,
} = products
