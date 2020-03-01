import { handleActions, combineActions } from 'redux-actions'
import { Record, List } from 'immutable'

import {
  fetchProductsSuccess,
  fetchProductsError,
  fetchProductSuccess,
  fetchProductError,
  fetchProductRatingSuccess,
  fetchProductRatingError,
  setSelectedProducts,
  deleteProductsSuccess,
  deleteProductsError,
  changeProductRatingSuccess,
  changeProductRatingError,
  deleteProductRatingSuccess,
  deleteProductRatingError,
  addProductSuccess,
  addProductError,
  editProductSuccess,
  editProductError,
  startRatingLoading,
  setProductsPerPage,
  setProductsFilter,
  startProductsLoading,
  setProductsSearchQuery,
} from '../actions'
import { PAGE_LIMITS, FIELDS } from '../../constants'
import { CurrentProductRecord } from './shared'

const initialState = Record({
  data: List(),
  totalAmount: 0,
  itemsPerPage: PAGE_LIMITS.CATALOG_DEFAULT,
  currentPage: 1,
  totalPages: 1,
  selected: List(),
  ratingsLoadingList: List(),
  ratingsErrorList: List(),
  filter: FIELDS.URL_NO_FILTER,
  currentProduct: new CurrentProductRecord(),
  lastSearchQuery: '',
  isLoading: true,
  error: '',
})()

const products = handleActions(
  {
    [startProductsLoading]: state => state.set('isLoading', true),

    [fetchProductsSuccess]: (state, action) =>
      state
        .set('data', action.payload.productsList)
        .set('totalAmount', action.payload.totalAmount)
        .set('itemsPerPage', action.payload.itemsPerPage)
        .set('currentPage', action.payload.currentPage)
        .set('totalPages', action.payload.totalPages)
        .set('isLoading', false)
        .delete('error'),

    [fetchProductSuccess]: (state, action) =>
      state
        .delete('currentProduct')
        .update('currentProduct', currentProduct => currentProduct.merge(action.payload.product))
        .set('isLoading', false)
        .delete('error'),

    [fetchProductRatingSuccess]: (state, action) =>
      state
        .delete('currentProduct')
        .update('currentProduct', currentProduct =>
          currentProduct.merge(action.payload.productRatingData)
        )
        .set('totalAmount', action.payload.totalAmount)
        .set('itemsPerPage', action.payload.itemsPerPage)
        .set('currentPage', action.payload.currentPage)
        .set('totalPages', action.payload.totalPages)
        .set('isLoading', false)
        .delete('error'),

    [deleteProductsSuccess]: (state, action) =>
      state
        .update('data', data =>
          data.filter(
            product => action.payload.deletedProducts.findIndex(it => it === product._id) === -1
          )
        )
        .update('totalAmount', amount => amount - action.payload.deletedProducts.size)
        .set('isLoading', false)
        .delete('error'),

    [addProductSuccess]: (state, action) =>
      state
        .update('data', data => data.push(action.payload.product))
        .set('isLoading', false)
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
        .delete('currentProduct')
        .set('isLoading', false)
        .delete('error'),

    [combineActions(
      fetchProductsError,
      fetchProductError,
      fetchProductRatingError,
      addProductError,
      editProductError,
      deleteProductsError
    )]: (state, action) => state.set('isLoading', false).set('error', action.payload.error),

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

    [setProductsPerPage]: (state, action) => state.set('itemsPerPage', action.payload.amount),

    [setProductsFilter]: (state, action) => state.set('filter', action.payload.filter),

    [setProductsSearchQuery]: (state, action) =>
      state.set('lastSearchQuery', action.payload.searchQuery),
  },
  initialState
)

export default products
