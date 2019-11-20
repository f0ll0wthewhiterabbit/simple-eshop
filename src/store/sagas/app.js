import { takeEvery, put, select } from 'redux-saga/effects'

import { DELETE_SELECTED_ITEMS, STORAGE_FIELD_USERS, STORAGE_FIELD_PRODUCTS } from '../../constants'
import {
  setSelectedUsers,
  closeModal,
  deleteSelectedUsers,
  deleteSelectedUsersError,
  deleteSelectedProducts,
  deleteSelectedProductsError,
  startLoading,
  stopLoading,
} from '../actions'
import { updateStorageData } from '../../utils/storage'

function* deleteSelectedItemsSaga(action) {
  yield put(startLoading())

  if (action.payload === STORAGE_FIELD_USERS) {
    try {
      yield put(deleteSelectedUsers())
      const data = yield select(state => state.users.data)
      updateStorageData(STORAGE_FIELD_USERS, data)
    } catch (error) {
      yield put(deleteSelectedUsersError())
    }

    yield put(setSelectedUsers([]))
  } else if (action.payload === STORAGE_FIELD_PRODUCTS) {
    try {
      yield put(deleteSelectedProducts())
      const data = yield select(state => state.products.data)
      updateStorageData(STORAGE_FIELD_PRODUCTS, data)
    } catch (error) {
      yield put(deleteSelectedProductsError())
    }
  }

  yield put(stopLoading())
  yield put(closeModal())
}

function* watchDeleteSelectedItems() {
  yield takeEvery(DELETE_SELECTED_ITEMS, deleteSelectedItemsSaga)
}

export default watchDeleteSelectedItems
