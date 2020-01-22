import { takeEvery, put, select } from 'redux-saga/effects'
import { List } from 'immutable'

import API from '../../utils/api'
import convertToRecord from '../../utils/convertToRecord'
import {
  fetchUsersSuccess,
  fetchUsersError,
  deleteUsersSuccess,
  deleteUsersError,
  requestUserDeletionSuccess,
  requestUserDeletionError,
  authenticateSuccess,
  closeModal,
  setSelectedUsers,
  fetchUsers,
  deleteUsers,
  requestUserDeletion,
  updateUser,
  updateUserSuccess,
  updateUserError,
  authenticate,
} from '../actions'
import { MAIN_PAGE_PATH, ROLE_ADMIN, ADMIN_PRODUCTS_PAGE_PATH } from '../../constants'

function* fetchUsersSaga(action) {
  try {
    const { currentPage: page, itemsPerPage: limit } = action.payload
    const url = limit ? `/users/?page=${page}&limit=${limit}` : `/users/?page=${page}`
    const response = yield API.get(url)
    const usersList = convertToRecord(response.data.data)
    const {
      total: totalAmount,
      page: currentPage,
      perPage: itemsPerPage,
      totalPages,
    } = response.data

    yield put(fetchUsersSuccess(usersList, totalAmount, currentPage, itemsPerPage, totalPages))
  } catch (error) {
    yield put(fetchUsersError('Users data not recieved!'))
  }
}

function* deleteUsersSaga() {
  yield put(closeModal())

  const selectedUsers = yield select(state => state.getIn(['users', 'selected']))
  const config = {
    data: JSON.stringify(selectedUsers),
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    yield API.delete('/users', config)
    yield put(deleteUsersSuccess(selectedUsers))
  } catch (error) {
    yield put(deleteUsersError('Users delete error!'))
  }

  yield put(setSelectedUsers(List()))
}

function* requestUserDeletionSaga() {
  yield put(closeModal())

  try {
    const response = yield API.patch('/users')
    const { _id: id, firstName, lastName, email, role, isRemovable } = response.data
    const userData = { id, firstName, lastName, email, role, isRemovable }

    yield put(requestUserDeletionSuccess(id))
    yield put(authenticateSuccess(userData))
  } catch (error) {
    yield put(requestUserDeletionError('Users delete error!'))
  }
}

function* updateUserSaga(action) {
  const { userData, history } = action.payload
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify({
    firstName: userData.firstName,
    lastName: userData.lastName,
  })

  try {
    const response = yield API.patch('/users', body, config)
    const user = convertToRecord(response.data)
    const userRole = yield select(state => state.getIn(['auth', 'user', 'role']))

    yield put(updateUserSuccess(user))
    yield put(authenticate())

    if (userRole === ROLE_ADMIN) {
      history.push(ADMIN_PRODUCTS_PAGE_PATH)
    } else {
      history.push(MAIN_PAGE_PATH)
    }
  } catch (error) {
    yield put(updateUserError('User update error!'))
    yield action.payload.setFormSubmitting(false)
  }
}

function* watchFetchUsers() {
  yield takeEvery(fetchUsers, fetchUsersSaga)
}

function* watchDeleteUsers() {
  yield takeEvery(deleteUsers, deleteUsersSaga)
}

function* watchRequestUserDeletion() {
  yield takeEvery(requestUserDeletion, requestUserDeletionSaga)
}

function* watchUpdateUser() {
  yield takeEvery(updateUser, updateUserSaga)
}

export { watchFetchUsers, watchDeleteUsers, watchRequestUserDeletion, watchUpdateUser }
