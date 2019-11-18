import { takeEvery, call, put } from 'redux-saga/effects'

import { FETCH_USERS, STORAGE_FIELD_USERS } from '../../constants'
import getDataFromStorage from '../../utils/storage'
import { fetchUsersSuccess, fetchUsersError } from '../actions'

function* fetchUsersSaga() {
  try {
    const usersList = yield call(getDataFromStorage, STORAGE_FIELD_USERS)

    if (!usersList) {
      throw new Error('Users data not recieved')
    }

    yield put(fetchUsersSuccess(usersList))
  } catch (error) {
    yield put(fetchUsersError())
  }
}

function* watchFetchUsers() {
  yield takeEvery(FETCH_USERS, fetchUsersSaga)
}

export default watchFetchUsers
