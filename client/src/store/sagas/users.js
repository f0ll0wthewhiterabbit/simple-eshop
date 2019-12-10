import { takeEvery, put, select } from 'redux-saga/effects'

import API from '../../utils/api'
import { FETCH_USERS, DELETE_USERS, REQUEST_USER_DELETION } from '../../constants'
import {
  fetchUsersSuccess,
  fetchUsersError,
  startLoading,
  stopLoading,
  deleteUsersSuccess,
  deleteUsersError,
  requestUserDeletionSuccess,
  requestUserDeletionError,
  authenticateSuccess,
  closeModal,
  setSelectedUsers,
} from '../actions'

function* fetchUsersSaga() {
  yield put(startLoading())

  try {
    const response = yield API.get('/users')
    const usersList = response.data

    yield put(fetchUsersSuccess(usersList))
  } catch (error) {
    yield put(fetchUsersError('Users data not recieved!'))
  }

  yield put(stopLoading())
}

function* deleteUsersSaga() {
  yield put(startLoading())
  yield put(closeModal())

  const selectedUsers = yield select(state => state.users.selected)
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

  yield put(setSelectedUsers([]))
  yield put(stopLoading())
}

function* requestUserDeletionSaga() {
  yield put(startLoading())
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

  yield put(stopLoading())
}

function* watchFetchUsers() {
  yield takeEvery(FETCH_USERS, fetchUsersSaga)
}

function* watchDeleteUsers() {
  yield takeEvery(DELETE_USERS, deleteUsersSaga)
}

function* watchRequestUserDeletion() {
  yield takeEvery(REQUEST_USER_DELETION, requestUserDeletionSaga)
}

export { watchFetchUsers, watchDeleteUsers, watchRequestUserDeletion }
