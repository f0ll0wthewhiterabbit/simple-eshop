import { takeEvery, put, select, take } from 'redux-saga/effects'

import {
  DELETE_ITEMS,
  STORAGE_FIELD_USERS,
  STORAGE_FIELD_PRODUCTS,
  STORE_FIELD_USERS,
  STORE_FIELD_PRODUCTS,
  STORE_FIELD_CURRENT_USER,
  FETCH_USERS_SUCCESS,
} from '../../constants'
import {
  setSelectedUsers,
  closeModal,
  deleteUsers,
  deleteUsersError,
  deleteProducts,
  deleteProductsError,
  startLoading,
  stopLoading,
  deleteCurrentUser,
  deleteCurrentUserError,
  fetchUsers,
} from '../actions'
import { updateStorageData } from '../../utils/storage'

function* deleteItemsSaga(action) {
  yield put(startLoading())

  if (action.payload === STORE_FIELD_USERS) {
    try {
      yield put(deleteUsers())
      const data = yield select(state => state.users.data)
      updateStorageData(STORAGE_FIELD_USERS, data)
    } catch (error) {
      yield put(deleteUsersError('Delete users error!'))
    }

    yield put(setSelectedUsers([]))
  } else if (action.payload === STORE_FIELD_PRODUCTS) {
    try {
      yield put(deleteProducts())
      const data = yield select(state => state.products.data)
      updateStorageData(STORAGE_FIELD_PRODUCTS, data)
    } catch (error) {
      yield put(deleteProductsError('Delete products error!'))
    }
  } else if (action.payload === STORE_FIELD_CURRENT_USER) {
    try {
      yield put(fetchUsers())
      yield take(FETCH_USERS_SUCCESS)
      yield put(deleteCurrentUser())
      const data = yield select(state => state.users.data)
      updateStorageData(STORAGE_FIELD_USERS, data)
    } catch (error) {
      yield put(deleteCurrentUserError('Delete current user error!'))
    }
  }

  yield put(stopLoading())
  yield put(closeModal())
}

function* watchDeleteItems() {
  yield takeEvery(DELETE_ITEMS, deleteItemsSaga)
}

export default watchDeleteItems
