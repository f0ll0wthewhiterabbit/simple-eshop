import { takeEvery, put, select } from 'redux-saga/effects'
import { List } from 'immutable'

import API from '../../utils/api'
import convertToRecord from '../../utils/convertToRecord'
import { ADMIN_PRODUCTS_PAGE_PATH } from '../../constants'
import {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsError,
  changeProductRating,
  changeProductRatingSuccess,
  changeProductRatingError,
  deleteProductRating,
  deleteProductRatingSuccess,
  deleteProductRatingError,
  addProduct,
  addProductSuccess,
  addProductError,
  editProduct,
  editProductSuccess,
  editProductError,
  deleteProducts,
  deleteProductsSuccess,
  deleteProductsError,
  closeModal,
  setSelectedProducts,
  startRatingLoading,
} from '../actions'

function* fetchProductsSaga(action) {
  try {
    const { currentPage: page, itemsPerPage: limit, filter } = action.payload
    let url = `/products/?page=${page}`

    if (limit) {
      url += `&limit=${limit}`
    }

    if (filter) {
      url += `&filter=${filter}`
    }

    const response = yield API.get(url)
    const productsList = convertToRecord(response.data.data)
    const {
      total: totalAmount,
      page: currentPage,
      perPage: itemsPerPage,
      totalPages,
    } = response.data

    yield put(
      fetchProductsSuccess(productsList, totalAmount, currentPage, itemsPerPage, totalPages)
    )
  } catch (error) {
    yield put(fetchProductsError('Products data not recieved!'))
  }
}

function* changeProductRatingSaga(action) {
  const { productId, userRating } = action.payload.ratingData

  yield put(startRatingLoading(productId))

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify({ stars: userRating })

  try {
    const response = yield API.patch(`/products/${productId}`, body, config)
    const product = convertToRecord(response.data)

    yield put(changeProductRatingSuccess(product))
  } catch (error) {
    yield put(changeProductRatingError(productId))
  }
}

function* deleteProductRatingSaga(action) {
  const { productId } = action.payload

  yield put(startRatingLoading(productId))

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify({ stars: 0 })

  try {
    const response = yield API.patch(`/products/${productId}`, body, config)
    const product = convertToRecord(response.data)

    yield put(deleteProductRatingSuccess(product))
  } catch (error) {
    yield put(deleteProductRatingError(productId))
  }
}

function* addProductSaga(action) {
  const { productFormData, history } = action.payload
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }

  try {
    const response = yield API.post('/products', productFormData, config)
    const product = convertToRecord(response.data)

    yield put(addProductSuccess(product))
    history.push(ADMIN_PRODUCTS_PAGE_PATH)
  } catch (error) {
    const message = error.response.data.errors
      ? error.response.data.errors[0].msg
      : 'Product add error!'

    yield put(addProductError(message))
  }
}

function* editProductSaga(action) {
  const { id, changedFieldsFormData, history } = action.payload
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }

  try {
    const response = yield API.patch(`/products/${id}`, changedFieldsFormData, config)
    const product = convertToRecord(response.data)

    yield put(editProductSuccess(product))
    history.push(ADMIN_PRODUCTS_PAGE_PATH)
  } catch (error) {
    const message = error.response.data.errors
      ? error.response.data.errors[0].msg
      : 'Product add error!'

    yield put(editProductError(message))
  }
}

function* deleteProductsSaga() {
  yield put(closeModal())

  const selectedProducts = yield select(state => state.getIn(['products', 'selected']))
  const config = {
    data: JSON.stringify(selectedProducts),
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    yield API.delete('/products', config)
    yield put(deleteProductsSuccess(selectedProducts))
  } catch (error) {
    yield put(deleteProductsError('Products delete error!'))
  }

  yield put(setSelectedProducts(List()))
}

function* watchFetchProducts() {
  yield takeEvery(fetchProducts, fetchProductsSaga)
}

function* watchChangeProductRating() {
  yield takeEvery(changeProductRating, changeProductRatingSaga)
}

function* watchDeleteProductRating() {
  yield takeEvery(deleteProductRating, deleteProductRatingSaga)
}

function* watchAddProduct() {
  yield takeEvery(addProduct, addProductSaga)
}

function* watchEditProduct() {
  yield takeEvery(editProduct, editProductSaga)
}

function* watchDeleteProducts() {
  yield takeEvery(deleteProducts, deleteProductsSaga)
}

export {
  watchFetchProducts,
  watchChangeProductRating,
  watchDeleteProductRating,
  watchAddProduct,
  watchEditProduct,
  watchDeleteProducts,
}
