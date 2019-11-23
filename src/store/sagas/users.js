import { takeEvery, call, put } from 'redux-saga/effects'

import {
  FETCH_USERS,
  STORAGE_FIELD_USERS,
  ADD_USER,
  STORAGE_FIELD_TOKEN,
  STORAGE_FIELD_USER_ID,
  SIGN_IN_USER,
} from '../../constants'
import { getDataFromStorage, updateStorageData, generateUserToken } from '../../utils'
import {
  fetchUsersSuccess,
  fetchUsersError,
  startLoading,
  stopLoading,
  addUserSuccess,
  addUserError,
  signInUserSuccess,
  signInUserError,
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

function* signInUserSaga(action) {
  let currentUser

  try {
    const usersList = yield call(getDataFromStorage, STORAGE_FIELD_USERS)

    if (!usersList) {
      throw new Error('Something went wrong!')
    }

    const token = localStorage.getItem(STORAGE_FIELD_TOKEN)
    const userId = Number(localStorage.getItem(STORAGE_FIELD_USER_ID))

    if (token && userId) {
      currentUser = usersList.find(user => user.id === userId)

      if (currentUser.token !== token) {
        throw new Error('Sign in please to continue!')
      }
    } else {
      const userData = action.payload

      if (!userData.email) {
        throw new Error('Sign in please to continue!')
      }

      currentUser = usersList.find(user => user.email === userData.email)

      if (!currentUser || currentUser.password !== userData.password) {
        throw new Error('Wrong email or password!')
      } else {
        yield localStorage.setItem(STORAGE_FIELD_USER_ID, currentUser.id)
        yield localStorage.setItem(STORAGE_FIELD_TOKEN, currentUser.token)
      }
    }
  } catch (error) {
    const errorMessage = error.message || 'Wrong email or password!'
    yield put(signInUserError(errorMessage))
    return
  }

  yield put(
    signInUserSuccess({
      id: currentUser.id,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    })
  )
}

function* watchFetchUsers() {
  yield takeEvery(FETCH_USERS, fetchUsersSaga)
}

function* watchAddUser() {
  yield takeEvery(ADD_USER, addUserSaga)
}

function* watchSignInUser() {
  yield takeEvery(SIGN_IN_USER, signInUserSaga)
}

export { watchFetchUsers, watchAddUser, watchSignInUser }
