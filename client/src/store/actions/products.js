import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  SET_SELECTED_PRODUCTS,
  DELETE_PRODUCTS,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_ERROR,
  CHANGE_PRODUCT_RATING,
  CHANGE_PRODUCT_RATING_SUCCESS,
  CHANGE_PRODUCT_RATING_ERROR,
  DELETE_PRODUCT_RATING,
  DELETE_PRODUCT_RATING_SUCCESS,
  DELETE_PRODUCT_RATING_ERROR,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
} from '../../constants'

export const fetchProducts = () => ({
  type: FETCH_PRODUCTS,
})

export const fetchProductsSuccess = productsList => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { productsList },
})

export const fetchProductsError = error => ({
  type: FETCH_PRODUCTS_ERROR,
  payload: { error },
})

export const setSelectedProducts = selectedProductsList => ({
  type: SET_SELECTED_PRODUCTS,
  payload: { selectedProductsList },
})

export const deleteProducts = () => ({
  type: DELETE_PRODUCTS,
})

export const deleteProductsSuccess = deletedProducts => ({
  type: DELETE_PRODUCTS_SUCCESS,
  payload: { deletedProducts },
})

export const deleteProductsError = error => ({
  type: DELETE_PRODUCTS_ERROR,
  payload: { error },
})

export const changeProductRating = ratingData => ({
  type: CHANGE_PRODUCT_RATING,
  payload: { ratingData },
})

export const changeProductRatingSuccess = product => ({
  type: CHANGE_PRODUCT_RATING_SUCCESS,
  payload: { product },
})

export const changeProductRatingError = error => ({
  type: CHANGE_PRODUCT_RATING_ERROR,
  payload: { error },
})

export const deleteProductRating = productId => ({
  type: DELETE_PRODUCT_RATING,
  payload: { productId },
})

export const deleteProductRatingSuccess = product => ({
  type: DELETE_PRODUCT_RATING_SUCCESS,
  payload: { product },
})

export const deleteProductRatingError = error => ({
  type: DELETE_PRODUCT_RATING_ERROR,
  payload: { error },
})

export const addProduct = (productData, history) => ({
  type: ADD_PRODUCT,
  payload: { productData, history },
})

export const addProductSuccess = product => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: { product },
})

export const addProductError = error => ({
  type: ADD_PRODUCT_ERROR,
  payload: { error },
})
