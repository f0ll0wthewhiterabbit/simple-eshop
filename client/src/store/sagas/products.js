import { takeEvery, put, select } from 'redux-saga/effects'
import { List } from 'immutable'

import API from '../../utils/api'
import { ADMIN_PRODUCTS_PAGE_PATH } from '../../constants'
import {
  fetchProductsSuccess,
  fetchProductsError,
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
  fetchProducts,
  changeProductRating,
  deleteProductRating,
  addProduct,
  deleteProducts,
} from '../actions'

function* fetchProductsSaga() {
  try {
    const response = yield API.get('/products')
    const productsList = response.data

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
  yield takeEvery(fetchProducts.toString(), fetchProductsSaga)
}

function* watchChangeProductRating() {
  yield takeEvery(changeProductRating.toString(), changeProductRatingSaga)
}

function* watchDeleteProductRating() {
  yield takeEvery(deleteProductRating.toString(), deleteProductRatingSaga)
}

function* watchAddProduct() {
  yield takeEvery(addProduct.toString(), addProductSaga)
}

function* watchDeleteProducts() {
  yield takeEvery(deleteProducts.toString(), deleteProductsSaga)
}

export {
  watchFetchProducts,
  watchChangeProductRating,
  watchDeleteProductRating,
  watchAddProduct,
  watchDeleteProducts,
}
