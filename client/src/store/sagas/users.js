import { takeEvery, put, select, call } from 'redux-saga/effects'
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
  startUsersLoading,
} from '../actions'
import { MAIN_PAGE_PATH, ROLE_ADMIN, ADMIN_PRODUCTS_PAGE_PATH } from '../../constants'

export const getUsers = state => state.getIn(['users', 'selected'])
export const getRole = state => state.getIn(['auth', 'user', 'role'])

export function* handleFetchUsers(action) {
  try {
    yield put(startUsersLoading())
    const { currentPage: page, itemsPerPage: limit } = action.payload
    const url = limit ? `/users/?page=${page}&limit=${limit}` : `/users/?page=${page}`
    const response = yield call(API.get, url)
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

export function* handleDeleteUsers() {
  try {
    yield put(closeModal())
    yield put(startUsersLoading())

    const selectedUsers = yield select(getUsers)
    const config = {
      data: JSON.stringify(selectedUsers),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    yield call(API.delete, '/users', config)
    yield put(deleteUsersSuccess(selectedUsers))
  } catch (error) {
    yield put(deleteUsersError('Users delete error!'))
  }

  yield put(setSelectedUsers(List()))
}

export function* handleRequestUserDeletion() {
  try {
    yield put(closeModal())
    yield put(startUsersLoading())

    const response = yield call(API.patch, '/users')
    const { _id: id, firstName, lastName, email, role, isRemovable } = response.data
    const userData = { id, firstName, lastName, email, role, isRemovable }

    yield put(requestUserDeletionSuccess(id))
    yield put(authenticateSuccess(userData))
  } catch (error) {
    yield put(requestUserDeletionError('Users delete error!'))
  }
}

export function* handleUpdateUser(action) {
  try {
    yield put(startUsersLoading())
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

    const response = yield call(API.patch, '/users', body, config)
    const user = convertToRecord(response.data)
    const userRole = yield select(getRole)

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
  yield takeEvery(fetchUsers, handleFetchUsers)
}

function* watchDeleteUsers() {
  yield takeEvery(deleteUsers, handleDeleteUsers)
}

function* watchRequestUserDeletion() {
  yield takeEvery(requestUserDeletion, handleRequestUserDeletion)
}

function* watchUpdateUser() {
  yield takeEvery(updateUser, handleUpdateUser)
}

export { watchFetchUsers, watchDeleteUsers, watchRequestUserDeletion, watchUpdateUser }
