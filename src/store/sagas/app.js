import { takeEvery, put, select, take, call } from 'redux-saga/effects'

import {
  DELETE_ITEMS,
  STORAGE_FIELD_USERS,
  STORAGE_FIELD_PRODUCTS,
  STORE_FIELD_USERS,
  STORE_FIELD_PRODUCTS,
  STORE_FIELD_CURRENT_USER,
  INITIALIZE,
  FETCH_DATABASE_TO_STORAGE_SUCCESS,
} from '../../constants'
import {
  setSelectedUsers,
  closeModal,
  deleteUsersSuccess,
  deleteUsersError,
  deleteProductsSuccess,
  deleteProductsError,
  deleteCurrentUserSuccess,
  deleteCurrentUserError,
  startLoading,
  stopLoading,
  fetchDatabaseToStorage,
  signIn,
  setSelectedProducts,
} from '../actions'
import { updateStorageData, getDataFromStorage } from '../../utils'

function* deleteItemsSaga(action) {
  yield put(startLoading())

  if (action.payload === STORE_FIELD_USERS) {
    try {
      const usersList = yield call(getDataFromStorage, STORAGE_FIELD_USERS)
      const selectedUsers = yield select(state => state.users.selected)
      const newUsersList = usersList.filter(user => !selectedUsers.includes(user.id))
      yield call(updateStorageData, STORAGE_FIELD_USERS, newUsersList)
      yield put(deleteUsersSuccess(newUsersList))
    } catch (error) {
      yield put(deleteUsersError('Delete users error!'))
    }

    yield put(setSelectedUsers([]))
  } else if (action.payload === STORE_FIELD_PRODUCTS) {
    try {
      const productsList = yield call(getDataFromStorage, STORAGE_FIELD_PRODUCTS)
      const selectedProducts = yield select(state => state.products.selected)
      const newProductsList = productsList.filter(product => !selectedProducts.includes(product.id))
      yield call(updateStorageData, STORAGE_FIELD_PRODUCTS, newProductsList)
      yield put(deleteProductsSuccess(newProductsList))
    } catch (error) {
      yield put(deleteProductsError('Delete products error!'))
    }

    yield put(setSelectedProducts([]))
  } else if (action.payload === STORE_FIELD_CURRENT_USER) {
    try {
      const usersList = yield call(getDataFromStorage, STORAGE_FIELD_USERS)
      const currentUserId = yield select(state => state.users.current.id)
      const newUsersList = usersList.map(user => {
        return user.id !== currentUserId ? user : { ...user, isRemovable: true }
      })
      yield call(updateStorageData, STORAGE_FIELD_USERS, newUsersList)
      yield put(deleteCurrentUserSuccess(newUsersList))
    } catch (error) {
      yield put(deleteCurrentUserError('Delete current user error!'))
    }
  }

  yield put(stopLoading())
  yield put(closeModal())
}

function* initializeSaga() {
  yield put(fetchDatabaseToStorage())
  yield take(FETCH_DATABASE_TO_STORAGE_SUCCESS)
  yield put(signIn())
}

function* watchDeleteItems() {
  yield takeEvery(DELETE_ITEMS, deleteItemsSaga)
}

function* watchInitialize() {
  yield takeEvery(INITIALIZE, initializeSaga)
}

export { watchDeleteItems, watchInitialize }
