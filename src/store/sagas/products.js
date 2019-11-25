import { takeEvery, call, put, select } from 'redux-saga/effects'

import {
  FETCH_PRODUCTS,
  STORAGE_FIELD_PRODUCTS,
  CHANGE_PRODUCT_RATING,
  DELETE_PRODUCT_RATING,
} from '../../constants'
import { getDataFromStorage, updateStorageData } from '../../utils'
import {
  fetchProductsSuccess,
  fetchProductsError,
  startLoading,
  stopLoading,
  changeProductRatingSuccess,
  changeProductRatingError,
  deleteProductRatingSuccess,
  deleteProductRatingError,
} from '../actions'

function* fetchProductsSaga() {
  yield put(startLoading())

  try {
    const productsList = yield call(getDataFromStorage, STORAGE_FIELD_PRODUCTS)

    if (!productsList) {
      throw new Error('Products data not recieved!')
    }

    yield put(fetchProductsSuccess(productsList))
  } catch (error) {
    yield put(fetchProductsError('Products data not recieved!'))
  }

  yield put(stopLoading())
}

function* changeProductRatingSaga(action) {
  try {
    const { productId, userRating } = action.payload
    const productsList = yield call(getDataFromStorage, STORAGE_FIELD_PRODUCTS)
    const productIndex = productsList.findIndex(product => product.id === productId)
    const userId = yield select(state => state.users.current.id)
    const userRatingIndex = productsList[productIndex].rating.findIndex(
      rating => rating.userId === userId
    )
    if (userRatingIndex !== -1) {
      productsList[productIndex].rating[userRatingIndex].stars = userRating
    } else {
      productsList[productIndex].rating.push({ userId, stars: userRating })
    }
    yield call(updateStorageData, STORAGE_FIELD_PRODUCTS, productsList)
    yield put(changeProductRatingSuccess(productsList))
  } catch (error) {
    yield put(changeProductRatingError('Product rating change error!'))
  }
}

function* deleteProductRatingSaga(action) {
  try {
    const productId = action.payload
    const productsList = yield call(getDataFromStorage, STORAGE_FIELD_PRODUCTS)
    const productIndex = productsList.findIndex(product => product.id === productId)
    const userId = yield select(state => state.users.current.id)
    const userRatingIndex = productsList[productIndex].rating.findIndex(
      rating => rating.userId === userId
    )
    productsList[productIndex].rating.splice(userRatingIndex, 1)
    yield call(updateStorageData, STORAGE_FIELD_PRODUCTS, productsList)
    yield put(deleteProductRatingSuccess(productsList))
  } catch (error) {
    yield put(deleteProductRatingError('Product rating delete error!'))
  }
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

export { watchFetchProducts, watchChangeProductRating, watchDeleteProductRating }
