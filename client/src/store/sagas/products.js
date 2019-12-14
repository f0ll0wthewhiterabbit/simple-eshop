import { takeEvery, put, select } from 'redux-saga/effects'

import API from '../../utils/api'
import {
  FETCH_PRODUCTS,
  CHANGE_PRODUCT_RATING,
  DELETE_PRODUCT_RATING,
  ADD_PRODUCT,
  ADMIN_PRODUCTS_PAGE_PATH,
  DELETE_PRODUCTS,
} from '../../constants'
import {
  fetchProductsSuccess,
  fetchProductsError,
  startPageLoading,
  stopPageLoading,
  changeProductRatingSuccess,
  changeProductRatingError,
  deleteProductRatingSuccess,
  deleteProductRatingError,
  addProductSuccess,
  addProductError,
  deleteProductsSuccess,
  deleteProductsError,
  closeModal,
  setSelectedProducts,
  startRatingLoading,
} from '../actions'

function* fetchProductsSaga() {
  yield put(startPageLoading())

  try {
    const response = yield API.get('/products')
    const productsList = response.data

    yield put(fetchProductsSuccess(productsList))
  } catch (error) {
    yield put(fetchProductsError('Products data not recieved!'))
  }

  yield put(stopPageLoading())
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
    const product = response.data

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
    const product = response.data

    yield put(deleteProductRatingSuccess(product))
  } catch (error) {
    yield put(deleteProductRatingError(productId))
  }
}

function* addProductSaga(action) {
  yield put(startPageLoading())

  const { history } = action.payload
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify(action.payload.productData)

  try {
    const response = yield API.post('/products', body, config)
    const product = response.data

    yield put(addProductSuccess(product))
    history.push(ADMIN_PRODUCTS_PAGE_PATH)
  } catch (error) {
    yield put(addProductError('Product add error!'))
    yield put(stopPageLoading())
  }
}

function* deleteProductsSaga() {
  yield put(startPageLoading())
  yield put(closeModal())

  const selectedProducts = yield select(state => state.products.selected)
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

  yield put(setSelectedProducts([]))
  yield put(stopPageLoading())
}

function* watchFetchProducts() {
  yield takeEvery(FETCH_PRODUCTS, fetchProductsSaga)
}

function* watchChangeProductRating() {
  yield takeEvery(CHANGE_PRODUCT_RATING, changeProductRatingSaga)
}

function* watchDeleteProductRating() {
  yield takeEvery(DELETE_PRODUCT_RATING, deleteProductRatingSaga)
}

function* watchAddProduct() {
  yield takeEvery(ADD_PRODUCT, addProductSaga)
}

function* watchDeleteProducts() {
  yield takeEvery(DELETE_PRODUCTS, deleteProductsSaga)
}

export {
  watchFetchProducts,
  watchChangeProductRating,
  watchDeleteProductRating,
  watchAddProduct,
  watchDeleteProducts,
}
