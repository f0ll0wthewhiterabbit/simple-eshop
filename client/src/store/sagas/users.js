import { takeEvery, put, select } from 'redux-saga/effects'
import { List } from 'immutable'

import API from '../../utils/api'
import {
  fetchUsersSuccess,
  fetchUsersError,
  startPageLoading,
  stopPageLoading,
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
} from '../actions'

function* fetchUsersSaga() {
  yield put(startPageLoading())

  try {
    const response = yield API.get('/users')
    const usersList = response.data

    yield put(fetchUsersSuccess(usersList))
  } catch (error) {
    yield put(fetchUsersError('Users data not recieved!'))
  }

  yield put(stopPageLoading())
}

function* deleteUsersSaga() {
  yield put(startPageLoading())
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
  yield put(stopPageLoading())
}

function* requestUserDeletionSaga() {
  yield put(startPageLoading())
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

  yield put(stopPageLoading())
}

function* watchFetchUsers() {
  yield takeEvery(fetchUsers.toString(), fetchUsersSaga)
}

function* watchDeleteUsers() {
  yield takeEvery(deleteUsers.toString(), deleteUsersSaga)
}

function* watchRequestUserDeletion() {
  yield takeEvery(requestUserDeletion.toString(), requestUserDeletionSaga)
}

export { watchFetchUsers, watchDeleteUsers, watchRequestUserDeletion }
