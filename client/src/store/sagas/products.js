import { takeEvery, put, select, call } from 'redux-saga/effects'
import { List } from 'immutable'

import API from '../../utils/api'
import convertToRecord from '../../utils/convertToRecord'
import { PAGE_PATHS } from '../../constants'
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsError,
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductError,
  fetchProductRatingRequest,
  fetchProductRatingSuccess,
  fetchProductRatingError,
  changeProductRatingRequest,
  changeProductRatingSuccess,
  changeProductRatingError,
  deleteProductRatingRequest,
  deleteProductRatingSuccess,
  deleteProductRatingError,
  addProductRequest,
  addProductSuccess,
  addProductError,
  editProductRequest,
  editProductSuccess,
  editProductError,
  deleteProductsRequest,
  deleteProductsSuccess,
  deleteProductsError,
  closeModal,
  setSelectedProducts,
  startRatingLoading,
  startProductsLoading,
} from '../actions'

export const getSelectedProducts = state => state.getIn(['products', 'selected'])

export function* handleFetchProductsRequest(action) {
  try {
    yield put(startProductsLoading())
    const { page, itemsPerPage: limit, searchText, filter } = action.payload
    let url = `/products/?page=${page}`

    if (limit) {
      url += `&limit=${limit}`
    }

    if (searchText) {
      url += `&q=${searchText}`
    }

    if (filter) {
      url += `&filter=${filter}`
    }

    const response = yield call(API.get, url)
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

export function* handleFetchProductRequest(action) {
  try {
    yield put(startProductsLoading())
    const response = yield call(API.get, `/products/${action.payload.id}`)
    const { _id: id, title, description, price, imageName, tags } = response.data
    const product = convertToRecord({
      id,
      title,
      description,
      price,
      imageName,
      tags,
    })

    yield put(fetchProductSuccess(product))
  } catch (error) {
    yield put(fetchProductError('Product not recieved!'))
  }
}

export function* handleFetchProductRatingRequest(action) {
  try {
    yield put(startProductsLoading())
    const { productId, page, itemsPerPage: limit } = action.payload
    let url = `/products/${productId}/rating?page=${page}`

    if (limit) {
      url += `&limit=${limit}`
    }

    const response = yield call(API.get, url)
    const { id, title, rating } = response.data.data
    const {
      total: totalAmount,
      page: currentPage,
      perPage: itemsPerPage,
      totalPages,
    } = response.data
    const productRatingData = convertToRecord({
      id,
      title,
      rating,
    })

    yield put(
      fetchProductRatingSuccess(
        productRatingData,
        totalAmount,
        currentPage,
        itemsPerPage,
        totalPages
      )
    )
  } catch (error) {
    yield put(fetchProductRatingError('Product rating not recieved!'))
  }
}

export function* handleChangeProductRatingRequest(action) {
  const { productId, userRating } = action.payload.ratingData

  yield put(startRatingLoading(productId))

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify({ stars: userRating })

  try {
    const response = yield call(API.patch, `/products/${productId}`, body, config)
    const product = convertToRecord(response.data)

    yield put(changeProductRatingSuccess(product))
  } catch (error) {
    yield put(changeProductRatingError(productId))
  }
}

export function* handleDeleteProductRatingRequest(action) {
  const { productId } = action.payload

  yield put(startRatingLoading(productId))

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify({ stars: 0 })

  try {
    const response = yield call(API.patch, `/products/${productId}`, body, config)
    const product = convertToRecord(response.data)

    yield put(deleteProductRatingSuccess(product))
  } catch (error) {
    yield put(deleteProductRatingError(productId))
  }
}

export function* handleAddProductRequest(action) {
  const { productFormData, history } = action.payload
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }

  try {
    const response = yield call(API.post, '/products', productFormData, config)
    const product = convertToRecord(response.data)

    yield put(addProductSuccess(product))
    history.push(PAGE_PATHS.ADMIN_PRODUCTS)
  } catch (error) {
    const message = error.response.data.errors
      ? error.response.data.errors[0].msg
      : 'Product add error!'

    yield put(addProductError(message))
    yield action.payload.setFormSubmitting(false)
  }
}

export function* handleEditProductRequest(action) {
  const { id, changedFieldsFormData, history } = action.payload
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }

  try {
    const response = yield call(API.patch, `/products/${id}`, changedFieldsFormData, config)
    const product = convertToRecord(response.data)

    yield put(editProductSuccess(product))
    history.push(PAGE_PATHS.ADMIN_PRODUCTS)
  } catch (error) {
    const message = error.response.data.errors
      ? error.response.data.errors[0].msg
      : 'Product edit error!'

    yield put(editProductError(message))
    yield action.payload.setFormSubmitting(false)
  }
}

export function* handleDeleteProductsRequest() {
  try {
    yield put(closeModal())
    yield put(startProductsLoading())

    const selectedProducts = yield select(getSelectedProducts)
    const config = {
      data: JSON.stringify(selectedProducts),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    yield call(API.delete, '/products', config)
    yield put(deleteProductsSuccess(selectedProducts))
  } catch (error) {
    yield put(deleteProductsError('Products delete error!'))
  }

  yield put(setSelectedProducts(List()))
}

function* watchFetchProductsRequest() {
  yield takeEvery(fetchProductsRequest, handleFetchProductsRequest)
}

function* watchFetchProductRequest() {
  yield takeEvery(fetchProductRequest, handleFetchProductRequest)
}

function* watchFetchProductRatingRequest() {
  yield takeEvery(fetchProductRatingRequest, handleFetchProductRatingRequest)
}

function* watchChangeProductRatingRequest() {
  yield takeEvery(changeProductRatingRequest, handleChangeProductRatingRequest)
}

function* watchDeleteProductRatingRequest() {
  yield takeEvery(deleteProductRatingRequest, handleDeleteProductRatingRequest)
}

function* watchAddProductRequest() {
  yield takeEvery(addProductRequest, handleAddProductRequest)
}

function* watchEditProductRequest() {
  yield takeEvery(editProductRequest, handleEditProductRequest)
}

function* watchDeleteProductsRequest() {
  yield takeEvery(deleteProductsRequest, handleDeleteProductsRequest)
}

export {
  watchFetchProductsRequest,
  watchFetchProductRequest,
  watchFetchProductRatingRequest,
  watchChangeProductRatingRequest,
  watchDeleteProductRatingRequest,
  watchAddProductRequest,
  watchEditProductRequest,
  watchDeleteProductsRequest,
}
