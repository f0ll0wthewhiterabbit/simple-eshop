import { handleActions, combineActions } from 'redux-actions'
import { fromJS } from 'immutable'

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

const initialState = fromJS({
  data: [],
  selected: [],
  ratingsLoadingList: [],
  ratingsErrorList: [],
  error: null,
})

const products = handleActions(
  {
    [fetchProductsSuccess]: (state, action) =>
      state.merge({
        data: fromJS(action.payload.productsList),
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
        .set('error', null),
    [addProductSuccess]: (state, action) =>
      state.update('data', data => data.push(fromJS(action.payload.product))).set('error', null),
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
      state.set('error', action.payload.error),
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
