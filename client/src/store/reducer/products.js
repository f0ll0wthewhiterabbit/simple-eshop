import { handleActions, combineActions } from 'redux-actions'
import { Record, List } from 'immutable'

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
  editProduct,
  editProductSuccess,
  editProductError,
  startRatingLoading,
} from '../actions'

const ProductsRecord = Record({
  data: List(),
  selected: List(),
  ratingsLoadingList: List(),
  ratingsErrorList: List(),
  isLoading: false,
  error: null,
})
const initialState = new ProductsRecord()

const products = handleActions(
  {
    [combineActions(fetchProducts, addProduct, editProduct, deleteProducts)]: state =>
      state.set('isLoading', true),

    [fetchProductsSuccess]: (state, action) =>
      state
        .set('data', action.payload.productsList)
        .delete('isLoading')
        .delete('error'),

    [deleteProductsSuccess]: (state, action) =>
      state
        .update('data', data =>
          data.filter(
            product =>
              action.payload.deletedProducts.findIndex(it => it === product.get('_id')) === -1
          )
        )
        .delete('isLoading')
        .delete('error'),

    [addProductSuccess]: (state, action) =>
      state
        .update('data', data => data.push(action.payload.product))
        .delete('isLoading')
        .delete('error'),

    [combineActions(changeProductRatingSuccess, deleteProductRatingSuccess)]: (state, action) =>
      state
        .update('data', data =>
          data.map(product =>
            product.get('_id') !== action.payload.product._id ? product : action.payload.product
          )
        )
        .update('ratingsLoadingList', ratingsLoadingList =>
          ratingsLoadingList.filter(id => id !== action.payload.product._id)
        )
        .update('ratingsErrorList', ratingsErrorList =>
          ratingsErrorList.filter(id => id !== action.payload.product._id)
        ),

    [editProductSuccess]: (state, action) =>
      state
        .update('data', data =>
          data.map(product =>
            product.get('_id') !== action.payload.product._id ? product : action.payload.product
          )
        )
        .delete('isLoading')
        .delete('error'),

    [combineActions(fetchProductsError, addProductError, editProductError, deleteProductsError)]: (
      state,
      action
    ) => state.delete('isLoading').set('error', action.payload.error),

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
