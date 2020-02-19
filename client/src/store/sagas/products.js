import { takeEvery, put, select, call } from 'redux-saga/effects'
import { List } from 'immutable'

import API from '../../utils/api'
import convertToRecord from '../../utils/convertToRecord'
import { ADMIN_PRODUCTS_PAGE_PATH } from '../../constants'
import {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsError,
  fetchProduct,
  fetchProductSuccess,
  fetchProductError,
  fetchProductRating,
  fetchProductRatingSuccess,
  fetchProductRatingError,
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
  startProductsLoading,
} from '../actions'

export const getSelectedProducts = state => state.getIn(['products', 'selected'])

export function* handleFetchProducts(action) {
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

export function* handleFetchProduct(action) {
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

export function* handleFetchProductRating(action) {
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

export function* handleChangeProductRating(action) {
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

export function* handleDeleteProductRating(action) {
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

export function* handleAddProduct(action) {
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
    history.push(ADMIN_PRODUCTS_PAGE_PATH)
  } catch (error) {
    const message = error.response.data.errors
      ? error.response.data.errors[0].msg
      : 'Product add error!'

    yield put(addProductError(message))
    yield action.payload.setFormSubmitting(false)
  }
}

export function* handleEditProduct(action) {
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
    history.push(ADMIN_PRODUCTS_PAGE_PATH)
  } catch (error) {
    const message = error.response.data.errors
      ? error.response.data.errors[0].msg
      : 'Product edit error!'

    yield put(editProductError(message))
    yield action.payload.setFormSubmitting(false)
  }
}

export function* handleDeleteProducts() {
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

function* watchFetchProducts() {
  yield takeEvery(fetchProducts, handleFetchProducts)
}

function* watchFetchProduct() {
  yield takeEvery(fetchProduct, handleFetchProduct)
}

function* watchFetchProductRating() {
  yield takeEvery(fetchProductRating, handleFetchProductRating)
}

function* watchChangeProductRating() {
  yield takeEvery(changeProductRating, handleChangeProductRating)
}

function* watchDeleteProductRating() {
  yield takeEvery(deleteProductRating, handleDeleteProductRating)
}

function* watchAddProduct() {
  yield takeEvery(addProduct, handleAddProduct)
}

function* watchEditProduct() {
  yield takeEvery(editProduct, handleEditProduct)
}

function* watchDeleteProducts() {
  yield takeEvery(deleteProducts, handleDeleteProducts)
}

export {
  watchFetchProducts,
  watchFetchProduct,
  watchFetchProductRating,
  watchChangeProductRating,
  watchDeleteProductRating,
  watchAddProduct,
  watchEditProduct,
  watchDeleteProducts,
}
