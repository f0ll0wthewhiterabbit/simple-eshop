import { FETCH_PRODUCTS, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR } from '../../constants'

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
