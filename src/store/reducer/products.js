import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  SET_SELECTED_PRODUCTS,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_ERROR,
  CHANGE_PRODUCT_RATING_SUCCESS,
  CHANGE_PRODUCT_RATING_ERROR,
  DELETE_PRODUCT_RATING_SUCCESS,
  DELETE_PRODUCT_RATING_ERROR,
} from '../../constants'

const initialState = {
  data: [],
  selected: [],
  error: null,
}

const products = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
    case DELETE_PRODUCTS_SUCCESS:
    case CHANGE_PRODUCT_RATING_SUCCESS:
    case DELETE_PRODUCT_RATING_SUCCESS:
      return {
        ...state,
        data: [...action.payload.productsList],
        error: null,
      }

    case FETCH_PRODUCTS_ERROR:
    case DELETE_PRODUCTS_ERROR:
    case CHANGE_PRODUCT_RATING_ERROR:
    case DELETE_PRODUCT_RATING_ERROR:
      return {
        ...state,
        error: action.payload.error,
      }

    case SET_SELECTED_PRODUCTS:
      return {
        ...state,
        selected: [...action.payload.selectedProductsList],
      }

    default:
      return state
  }
}

export default products
