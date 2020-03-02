import { takeEvery, put, select, call } from 'redux-saga/effects'
import { List } from 'immutable'

import API from '../../utils/api'
import convertToRecord from '../../utils/convertToRecord'
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersError,
  deleteUsersRequest,
  deleteUsersSuccess,
  deleteUsersError,
  callForUserDeletionRequest,
  callForUserDeletionSuccess,
  callForUserDeletionError,
  updateUserRequest,
  updateUserSuccess,
  updateUserError,
  authenticateRequest,
  authenticateSuccess,
  closeModal,
  setSelectedUsers,
  startUsersLoading,
} from '../actions'
import { ROLES, PAGE_PATHS } from '../../constants'

export const getUsers = state => state.getIn(['users', 'selected'])
export const getRole = state => state.getIn(['auth', 'user', 'role'])

export function* handleFetchUsersRequest(action) {
  try {
    yield put(startUsersLoading())
    const { currentPage: page, queryParams } = action.payload
    const { itemsPerPage: limit, searchText } = queryParams
    let url = `/users/?page=${page}`

    if (limit) {
      url += `&limit=${limit}`
    }

    if (searchText) {
      url += `&q=${searchText}`
    }

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
    yield put(fetchUsersError('Users data not received!'))
  }
}

export function* handleDeleteUsersRequest() {
  try {
    yield put(closeModal())
    yield put(startUsersLoading())

    const selectedUsers = yield select(getUsers)

    yield call(API.delete, '/users', { data: selectedUsers })
    yield put(deleteUsersSuccess(selectedUsers))
  } catch (error) {
    yield put(deleteUsersError('Users delete error!'))
  }

  yield put(setSelectedUsers(List()))
}

export function* handleCallForUserDeletionRequest() {
  try {
    yield put(closeModal())
    yield put(startUsersLoading())

    const response = yield call(API.patch, '/users')
    const { _id: id, firstName, lastName, email, role, isRemovable } = response.data
    const userData = { id, firstName, lastName, email, role, isRemovable }

    yield put(callForUserDeletionSuccess(id))
    yield put(authenticateSuccess(userData))
  } catch (error) {
    yield put(callForUserDeletionError('Users delete error!'))
  }
}

export function* handleUpdateUserRequest(action) {
  try {
    yield put(startUsersLoading())

    const { userData, history } = action.payload

    const response = yield call(API.patch, '/users', {
      firstName: userData.firstName,
      lastName: userData.lastName,
    })
    const user = convertToRecord(response.data)
    const userRole = yield select(getRole)

    yield put(updateUserSuccess(user))
    yield put(authenticateRequest())

    if (userRole === ROLES.ADMIN) {
      history.push(PAGE_PATHS.ADMIN_PRODUCTS)
    } else {
      history.push(PAGE_PATHS.HOME)
    }
  } catch (error) {
    yield put(updateUserError('User update error!'))
    yield action.payload.setFormSubmitting(false)
  }
}

function* watchFetchUsersRequest() {
  yield takeEvery(fetchUsersRequest, handleFetchUsersRequest)
}

function* watchDeleteUsersRequest() {
  yield takeEvery(deleteUsersRequest, handleDeleteUsersRequest)
}

function* watchCallForUserDeletionRequest() {
  yield takeEvery(callForUserDeletionRequest, handleCallForUserDeletionRequest)
}

function* watchUpdateUserRequest() {
  yield takeEvery(updateUserRequest, handleUpdateUserRequest)
}

export {
  watchFetchUsersRequest,
  watchDeleteUsersRequest,
  watchCallForUserDeletionRequest,
  watchUpdateUserRequest,
}
