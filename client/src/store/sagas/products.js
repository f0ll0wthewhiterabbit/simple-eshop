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

function* fetchProductsSaga() {
  try {
    const response = yield API.get('/products')
    const productsList = convertToRecord(response.data)

    yield put(fetchProductsSuccess(productsList))
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
  const { productData, history } = action.payload
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify(productData)

  try {
    const response = yield API.post('/products', body, config)
    const product = convertToRecord(response.data)

    yield put(addProductSuccess(product))
    history.push(ADMIN_PRODUCTS_PAGE_PATH)
  } catch (error) {
    yield put(addProductError('Product add error!'))
  }
}

function* editProductSaga(action) {
  const { id, changedFields, history } = action.payload
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify(changedFields)

  try {
    const response = yield API.patch(`/products/${id}`, body, config)
    const product = convertToRecord(response.data)

    yield put(editProductSuccess(product))
    history.push(ADMIN_PRODUCTS_PAGE_PATH)
  } catch (error) {
    yield put(editProductError('Product edit error!'))
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
