import { takeEvery, call, put } from 'redux-saga/effects'

import {
  FETCH_USERS,
  STORAGE_FIELD_USERS,
  ADD_USER,
  STORAGE_FIELD_TOKEN,
  STORAGE_FIELD_USER_ID,
} from '../../constants'
import { getDataFromStorage, updateStorageData, generateUserToken } from '../../utils'
import {
  fetchUsersSuccess,
  fetchUsersError,
  startLoading,
  stopLoading,
  addUserSuccess,
  addUserError,
} from '../actions'

function* fetchUsersSaga() {
  yield put(startLoading())

  try {
    const usersList = yield call(getDataFromStorage, STORAGE_FIELD_USERS)

    if (!usersList) {
      throw new Error('Users data not recieved!')
    }

    yield put(fetchUsersSuccess(usersList))
  } catch (error) {
    yield put(fetchUsersError('Users data not recieved!'))
  }

  yield put(stopLoading())
}

function* addUserSaga(action) {
  const userData = action.payload

  try {
    const usersList = yield call(getDataFromStorage, STORAGE_FIELD_USERS)

    if (!usersList) {
      throw new Error('Something went wrong!')
    }

    const isUserInDatabase = usersList.some(user => user.email === userData.email)

    if (isUserInDatabase) {
      throw new Error('Email has already been taken!')
    } else {
      const userId = usersList[usersList.length - 1].id + 1
      const token = generateUserToken()
      usersList.push({
        id: userId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        isRemovable: false,
        token,
      })

      yield call(updateStorageData, STORAGE_FIELD_USERS, usersList)
      yield localStorage.setItem(STORAGE_FIELD_USER_ID, userId)
      yield localStorage.setItem(STORAGE_FIELD_TOKEN, token)

      yield put(
        addUserSuccess({
          id: userId,
          firstName: userData.firstName,
          lastName: userData.lastName,
        })
      )
    }
  } catch (error) {
    const errorMessage = error.message || 'Something went wrong registering the user!'
    yield put(addUserError(errorMessage))
  }
}

function* watchFetchUsers() {
  yield takeEvery(FETCH_USERS, fetchUsersSaga)
}

function* watchAddUser() {
  yield takeEvery(ADD_USER, addUserSaga)
}

export { watchFetchUsers, watchAddUser }
