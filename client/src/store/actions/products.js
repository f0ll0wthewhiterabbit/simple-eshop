import { createAction } from 'redux-actions'

export const fetchProducts = createAction('PRODUCTS/FETCH_PRODUCTS')
export const fetchProductsSuccess = createAction(
  'PRODUCTS/FETCH_PRODUCTS_SUCCESS',
  productsList => ({ productsList })
)
export const fetchProductsError = createAction('PRODUCTS/FETCH_PRODUCTS_ERROR', error => ({
  error,
}))
export const setSelectedProducts = createAction(
  'PRODUCTS/SET_SELECTED_PRODUCTS',
  selectedProductsList => ({ selectedProductsList })
)
export const deleteProducts = createAction('PRODUCTS/DELETE_PRODUCTS')
export const deleteProductsSuccess = createAction(
  'PRODUCTS/DELETE_PRODUCTS_SUCCESS',
  deletedProducts => ({ deletedProducts })
)
export const deleteProductsError = createAction('PRODUCTS/DELETE_PRODUCTS_ERROR', error => ({
  error,
}))
export const changeProductRating = createAction('PRODUCTS/CHANGE_PRODUCT_RATING', ratingData => ({
  ratingData,
}))
export const changeProductRatingSuccess = createAction(
  'PRODUCTS/CHANGE_PRODUCT_RATING_SUCCESS',
  product => ({ product })
)
export const changeProductRatingError = createAction(
  'PRODUCTS/CHANGE_PRODUCT_RATING_ERROR',
  id => ({ id })
)
export const deleteProductRating = createAction('PRODUCTS/DELETE_PRODUCT_RATING', productId => ({
  productId,
}))
export const deleteProductRatingSuccess = createAction(
  'PRODUCTS/DELETE_PRODUCT_RATING_SUCCESS',
  product => ({ product })
)
export const deleteProductRatingError = createAction(
  'PRODUCTS/DELETE_PRODUCT_RATING_ERROR',
  id => ({ id })
)
export const addProduct = createAction('PRODUCTS/ADD_PRODUCT', (productFormData, history) => ({
  productFormData,
  history,
}))
export const addProductSuccess = createAction('PRODUCTS/ADD_PRODUCT_SUCCESS', product => ({
  product,
}))
export const addProductError = createAction('PRODUCTS/ADD_PRODUCT_ERROR', error => ({ error }))
export const startRatingLoading = createAction('PRODUCTS/START_RATING_LOADING', id => ({ id }))
export const editProduct = createAction(
  'PRODUCTS/EDIT_PRODUCT',
  (id, changedFieldsFormData, history) => ({
    id,
    changedFieldsFormData,
    history,
  })
)
export const editProductSuccess = createAction('PRODUCTS/EDIT_PRODUCT_SUCCESS', product => ({
  product,
}))
export const editProductError = createAction('PRODUCTS/EDIT_PRODUCT_ERROR', error => ({ error }))
