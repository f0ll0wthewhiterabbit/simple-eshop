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
  setProductsPerPage,
  setProductsFilter,
} from '../actions'
import { DEFAULT_CATALOG_PER_PAGE_LIMIT, URL_FIELD_NO_FILTER } from '../../constants'

const ProductsRecord = Record({
  data: List(),
  totalAmount: 0,
  itemsPerPage: DEFAULT_CATALOG_PER_PAGE_LIMIT,
  currentPage: 1,
  totalPages: 1,
  selected: List(),
  ratingsLoadingList: List(),
  ratingsErrorList: List(),
  filter: URL_FIELD_NO_FILTER,
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
        .set('totalAmount', action.payload.totalAmount)
        .set('itemsPerPage', action.payload.itemsPerPage)
        .set('currentPage', action.payload.currentPage)
        .set('totalPages', action.payload.totalPages)
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
        .update('totalAmount', amount => amount - action.payload.deletedProducts.size)
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

    [setProductsPerPage]: (state, action) => state.set('itemsPerPage', action.payload.amount),

    [setProductsFilter]: (state, action) => state.set('filter', action.payload.filter),
  },
  initialState
)

export default products
