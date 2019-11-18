import { FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR } from '../../constants'

const initialState = {
  data: [],
  isErrorInLoad: false,
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

    default:
      return state
  }
}

export default products
