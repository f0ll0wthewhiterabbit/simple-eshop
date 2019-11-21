import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  SET_SELECTED_PRODUCTS,
  DELETE_PRODUCTS,
  DELETE_PRODUCTS_ERROR,
} from '../../constants'

export const fetchProducts = () => ({
  type: FETCH_PRODUCTS,
})

export const fetchProductsSuccess = productsList => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: productsList,
})

export const fetchProductsError = error => ({
  type: FETCH_PRODUCTS_ERROR,
  payload: error,
})

export const setSelectedProducts = selectedProductsList => ({
  type: SET_SELECTED_PRODUCTS,
  payload: selectedProductsList,
})

export const deleteProducts = () => ({
  type: DELETE_PRODUCTS,
})

export const deleteProductsError = error => ({
  type: DELETE_PRODUCTS_ERROR,
  payload: error,
})
