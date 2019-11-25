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
      return {
        ...state,
        data: [...action.payload],
        error: null,
      }

    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    case SET_SELECTED_PRODUCTS:
      return {
        ...state,
        selected: [...action.payload],
      }

    case DELETE_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
        error: null,
      }

    case DELETE_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    case CHANGE_PRODUCT_RATING_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
        error: null,
      }

    case CHANGE_PRODUCT_RATING_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_PRODUCT_RATING_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
        error: null,
      }

    case DELETE_PRODUCT_RATING_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default products
