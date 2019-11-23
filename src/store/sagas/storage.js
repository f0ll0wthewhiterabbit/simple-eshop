import { takeEvery, call, put } from 'redux-saga/effects'

import {
  FETCH_DATABASE_TO_STORAGE,
  PRODUCTS_API,
  USERS_API,
  STORAGE_FIELD_PRODUCTS,
  STORAGE_FIELD_USERS,
  STORAGE_FIELD_TOKEN,
  STORAGE_FIELD_USER_ID,
  DELETE_USER_DATA_FROM_STORAGE,
} from '../../constants'
import { fetchDatabaseToStorageSuccess, fetchDatabaseToStorageError } from '../actions'

function* fetchDatabaseToStorageSaga() {
  if (!localStorage.getItem(STORAGE_FIELD_PRODUCTS)) {
    try {
      const response = yield call(fetch, PRODUCTS_API)
      const productsList = yield call([response, response.json])
      yield localStorage.setItem(STORAGE_FIELD_PRODUCTS, JSON.stringify(productsList))
    } catch (error) {
      yield put(fetchDatabaseToStorageError('Database setup error!'))
      return
    }
  }

  if (!localStorage.getItem(STORAGE_FIELD_USERS)) {
    try {
      const response = yield call(fetch, USERS_API)
      const usersList = yield call([response, response.json])
      yield localStorage.setItem(STORAGE_FIELD_USERS, JSON.stringify(usersList))
    } catch (error) {
      yield put(fetchDatabaseToStorageError('Database setup error!'))
      return
    }
  }

  yield put(fetchDatabaseToStorageSuccess())
}

function* deleteUserDataFromStorageSaga() {
  yield localStorage.removeItem(STORAGE_FIELD_TOKEN)
  yield localStorage.removeItem(STORAGE_FIELD_USER_ID)
}

function* watchFetchDatabaseToStorage() {
  yield takeEvery(FETCH_DATABASE_TO_STORAGE, fetchDatabaseToStorageSaga)
}

function* watchDeleteUserDataFromStorage() {
  yield takeEvery(DELETE_USER_DATA_FROM_STORAGE, deleteUserDataFromStorageSaga)
}

export { watchFetchDatabaseToStorage, watchDeleteUserDataFromStorage }
