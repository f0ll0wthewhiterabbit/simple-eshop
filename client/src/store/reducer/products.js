import { handleActions, combineActions } from 'redux-actions'

import {
  fetchProductsSuccess,
  fetchProductsError,
  setSelectedProducts,
  deleteProductsSuccess,
  deleteProductsError,
  changeProductRatingSuccess,
  changeProductRatingError,
  deleteProductRatingSuccess,
  deleteProductRatingError,
  addProductSuccess,
  addProductError,
  startRatingLoading,
} from '../actions'

const initialState = {
  data: [],
  selected: [],
  ratingsLoadingList: [],
  ratingsErrorList: [],
  error: null,
}

const products = handleActions(
  {
    [fetchProductsSuccess]: (state, action) => ({
      ...state,
      data: [...action.payload.productsList],
      error: null,
    }),
    [deleteProductsSuccess]: (state, action) => ({
      ...state,
      data: state.data.filter(
        product => action.payload.deletedProducts.findIndex(it => it === product._id) === -1
      ),
      error: null,
    }),
    [addProductSuccess]: (state, action) => ({
      ...state,
      data: [...state.data, action.payload.product],
      error: null,
    }),
    [combineActions(changeProductRatingSuccess, deleteProductRatingSuccess)]: (state, action) => ({
      ...state,
      data: state.data.map(product =>
        product._id !== action.payload.product._id
          ? product
          : { ...product, ...action.payload.product }
      ),
      ratingsLoadingList: state.ratingsLoadingList.filter(id => id !== action.payload.product._id),
      ratingsErrorList: state.ratingsErrorList.filter(id => id !== action.payload.product._id),
    }),
    [combineActions(fetchProductsError, deleteProductsError, addProductError)]: (
      state,
      action
    ) => ({
      ...state,
      error: action.payload.error,
    }),
    [combineActions(changeProductRatingError, deleteProductRatingError)]: (state, action) => ({
      ...state,
      ratingsLoadingList: state.ratingsLoadingList.filter(id => id !== action.payload.id),
      ratingsErrorList: [...state.ratingsErrorList, action.payload.id],
    }),
    [setSelectedProducts]: (state, action) => ({
      ...state,
      selected: [...action.payload.selectedProductsList],
    }),
    [startRatingLoading]: (state, action) => ({
      ...state,
      ratingsLoadingList: [...state.ratingsLoadingList, action.payload.id],
    }),
  },
  initialState
)

export default products
