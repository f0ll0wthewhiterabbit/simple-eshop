import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  SET_SELECTED_PRODUCTS,
  DELETE_SELECTED_PRODUCTS,
  DELETE_SELECTED_PRODUCTS_ERROR,
} from '../../constants'

const initialState = {
  data: [],
  selected: [],
  isErrorInLoad: false,
  isErrorInDeletetion: true,
}

const products = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }

    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        isErrorInLoad: true,
      }

    case SET_SELECTED_PRODUCTS:
      return {
        ...state,
        selected: [...action.payload],
      }

    case DELETE_SELECTED_PRODUCTS:
      return {
        ...state,
        data: state.data.filter(product => !state.selected.includes(product.id)),
      }

    case DELETE_SELECTED_PRODUCTS_ERROR:
      return {
        ...state,
        isErrorInDeletetion: true,
      }

    default:
      return state
  }
}

export default products
