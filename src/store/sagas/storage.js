import { takeEvery, call, put } from 'redux-saga/effects'

import {
  FETCH_DATABASE_TO_STORAGE,
  PRODUCTS_API,
  USERS_API,
  STORAGE_FIELD_PRODUCTS,
  STORAGE_FIELD_USERS,
} from '../../constants'
import { fetchDatabaseToStorageSuccess, fetchDatabaseToStorageError } from '../actions'

function* fetchDatabaseToStorageSaga() {
  if (!localStorage.getItem(STORAGE_FIELD_PRODUCTS)) {
    try {
      const response = yield call(fetch, PRODUCTS_API)
      const productsList = yield call([response, response.json])
      yield localStorage.setItem(STORAGE_FIELD_PRODUCTS, JSON.stringify(productsList))
    } catch (error) {
      yield put(fetchDatabaseToStorageError())
      return
    }
  }

  if (!localStorage.getItem(STORAGE_FIELD_USERS)) {
    try {
      const response = yield call(fetch, USERS_API)
      const usersList = yield call([response, response.json])
      yield localStorage.setItem(STORAGE_FIELD_USERS, JSON.stringify(usersList))
    } catch (error) {
      yield put(fetchDatabaseToStorageError())
      return
    }
  }

  yield put(fetchDatabaseToStorageSuccess())
}

function* watchFetchDatabaseToStorage() {
  yield takeEvery(FETCH_DATABASE_TO_STORAGE, fetchDatabaseToStorageSaga)
}

export default watchFetchDatabaseToStorage
