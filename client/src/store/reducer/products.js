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
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  START_RATING_LOADING,
} from '../../constants'

const initialState = {
  data: [],
  selected: [],
  ratingsLoadingList: [],
  ratingsErrorList: [],
  error: null,
}

const products = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: [...action.payload.productsList],
        error: null,
      }

    case DELETE_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: state.data.filter(
          product => action.payload.deletedProducts.findIndex(it => it === product._id) === -1
        ),
        error: null,
      }

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload.product],
        error: null,
      }

    case CHANGE_PRODUCT_RATING_SUCCESS:
    case DELETE_PRODUCT_RATING_SUCCESS:
      return {
        ...state,
        data: state.data.map(product =>
          product._id !== action.payload.product._id
            ? product
            : { ...product, ...action.payload.product }
        ),
        ratingsLoadingList: state.ratingsLoadingList.filter(
          id => id !== action.payload.product._id
        ),
        ratingsErrorList: state.ratingsErrorList.filter(id => id !== action.payload.product._id),
      }

    case FETCH_PRODUCTS_ERROR:
    case DELETE_PRODUCTS_ERROR:
    case ADD_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload.error,
      }

    case CHANGE_PRODUCT_RATING_ERROR:
    case DELETE_PRODUCT_RATING_ERROR:
      return {
        ...state,
        ratingsLoadingList: state.ratingsLoadingList.filter(id => id !== action.payload.id),
        ratingsErrorList: [...state.ratingsErrorList, action.payload.id],
      }

    case SET_SELECTED_PRODUCTS:
      return {
        ...state,
        selected: [...action.payload.selectedProductsList],
      }

    case START_RATING_LOADING:
      return {
        ...state,
        ratingsLoadingList: [...state.ratingsLoadingList, action.payload.id],
      }

    default:
      return state
  }
}

export default products
