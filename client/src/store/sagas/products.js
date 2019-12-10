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
  startLoading,
  stopLoading,
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
} from '../actions'

function* fetchProductsSaga() {
  yield put(startLoading())

  try {
    const response = yield API.get('/products')
    const productsList = response.data

    yield put(fetchProductsSuccess(productsList))
  } catch (error) {
    yield put(fetchProductsError('Products data not recieved!'))
  }

  yield put(stopLoading())
}

function* changeProductRatingSaga(action) {
  const { productId, userRating } = action.payload.ratingData
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
    yield put(changeProductRatingError('Product rating change error!'))
  }
}

function* deleteProductRatingSaga(action) {
  const { productId } = action.payload
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
    yield put(deleteProductRatingError('Product rating delete error!'))
  }
}

function* addProductSaga(action) {
  yield put(startLoading())

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
    yield put(stopLoading())
  }
}

function* deleteProductsSaga() {
  yield put(startLoading())
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
  yield put(stopLoading())
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
