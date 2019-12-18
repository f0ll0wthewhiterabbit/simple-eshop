import { handleActions, combineActions } from 'redux-actions'
import { fromJS } from 'immutable'

import {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsError,
  setSelectedProducts,
  deleteProducts,
  deleteProductsSuccess,
  deleteProductsError,
  changeProductRatingSuccess,
  changeProductRatingError,
  deleteProductRatingSuccess,
  deleteProductRatingError,
  addProduct,
  addProductSuccess,
  addProductError,
  startRatingLoading,
} from '../actions'

const initialState = fromJS({
  data: [],
  selected: [],
  ratingsLoadingList: [],
  ratingsErrorList: [],
  isLoading: false,
  error: null,
})

const products = handleActions(
  {
    [combineActions(fetchProducts, addProduct, deleteProducts)]: state =>
      state.set('isLoading', true),
    [fetchProductsSuccess]: (state, action) =>
      state.merge({
        data: fromJS(action.payload.productsList),
        isLoading: false,
        error: null,
      }),
    [deleteProductsSuccess]: (state, action) =>
      state
        .update('data', data =>
          data.filter(
            product =>
              action.payload.deletedProducts.findIndex(it => it === product.get('_id')) === -1
          )
        )
        .merge({
          isLoading: false,
          error: null,
        }),
    [addProductSuccess]: (state, action) =>
      state
        .update('data', data => data.push(fromJS(action.payload.product)))
        .merge({
          isLoading: false,
          error: null,
        }),
    [combineActions(changeProductRatingSuccess, deleteProductRatingSuccess)]: (state, action) =>
      state
        .update('data', data =>
          data.map(product =>
            product.get('_id') !== action.payload.product._id
              ? product
              : fromJS(action.payload.product)
          )
        )
        .update('ratingsLoadingList', ratingsLoadingList =>
          ratingsLoadingList.filter(id => id !== action.payload.product._id)
        )
        .update('ratingsErrorList', ratingsErrorList =>
          ratingsErrorList.filter(id => id !== action.payload.product._id)
        ),
    [combineActions(fetchProductsError, deleteProductsError, addProductError)]: (state, action) =>
      state.merge({
        isLoading: false,
        error: action.payload.error,
      }),
    [combineActions(changeProductRatingError, deleteProductRatingError)]: (state, action) =>
      state
        .update('ratingsLoadingList', ratingsLoadingList =>
          ratingsLoadingList.filter(id => id !== action.payload.id)
        )
        .update('ratingsErrorList', ratingsErrorList => ratingsErrorList.push(action.payload.id)),
    [setSelectedProducts]: (state, action) =>
      state.set('selected', action.payload.selectedProductsList),
    [startRatingLoading]: (state, action) =>
      state.update('ratingsLoadingList', ratingsLoadingList =>
        ratingsLoadingList.push(action.payload.id)
      ),
  },
  initialState
)

export default products
