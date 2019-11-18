import { takeEvery, call, put } from 'redux-saga/effects'

import { FETCH_PRODUCTS, STORAGE_FIELD_PRODUCTS } from '../../constants'
import getDataFromStorage from '../../utils/storage'
import { fetchProductsSuccess, fetchProductsError } from '../actions'

function* fetchProductsSaga() {
  try {
    const productsList = yield call(getDataFromStorage, STORAGE_FIELD_PRODUCTS)

    if (!productsList) {
      throw new Error('Products data not recieved')
    }

    yield put(fetchProductsSuccess(productsList))
  } catch (error) {
    yield put(fetchProductsError())
  }
}

function* watchFetchProducts() {
  yield takeEvery(FETCH_PRODUCTS, fetchProductsSaga)
}

export default watchFetchProducts
