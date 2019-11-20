import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  SET_SELECTED_PRODUCTS,
  DELETE_SELECTED_PRODUCTS,
  DELETE_SELECTED_PRODUCTS_ERROR,
} from '../../constants'

export const fetchProducts = () => ({
  type: FETCH_PRODUCTS,
})

export const fetchProductsSuccess = productsList => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: productsList,
})

export const fetchProductsError = () => ({
  type: FETCH_PRODUCTS_ERROR,
})

export const setSelectedProducts = selectedProductsList => ({
  type: SET_SELECTED_PRODUCTS,
  payload: selectedProductsList,
})

export const deleteSelectedProducts = () => ({
  type: DELETE_SELECTED_PRODUCTS,
})

export const deleteSelectedProductsError = () => ({
  type: DELETE_SELECTED_PRODUCTS_ERROR,
})
