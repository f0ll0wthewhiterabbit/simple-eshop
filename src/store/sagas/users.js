import { takeEvery, call, put } from 'redux-saga/effects'

import {
  FETCH_USERS,
  STORAGE_FIELD_USERS,
  SIGN_UP,
  STORAGE_FIELD_TOKEN,
  STORAGE_FIELD_USER_ID,
  SIGN_IN,
  DATABASE_FIELD_ROLE_USER,
  SIGN_OUT,
  SING_IN_PAGE_PATH,
  ADMIN_PAGE_PATH,
} from '../../constants'
import { getDataFromStorage, updateStorageData, generateUserToken } from '../../utils'
import {
  fetchUsersSuccess,
  fetchUsersError,
  startLoading,
  stopLoading,
  signUpSuccess,
  signUpError,
  signInSuccess,
  signInError,
  signOutSuccess,
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

function* signUpSaga(action) {
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
        role: DATABASE_FIELD_ROLE_USER,
      })

      yield call(updateStorageData, STORAGE_FIELD_USERS, usersList)
      yield localStorage.setItem(STORAGE_FIELD_USER_ID, userId)
      yield localStorage.setItem(STORAGE_FIELD_TOKEN, token)

      yield put(
        signUpSuccess({
          id: userId,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: DATABASE_FIELD_ROLE_USER,
          isRemovable: false,
        })
      )
    }
  } catch (error) {
    const errorMessage = error.message || 'Something went wrong registering the user!'
    yield put(signUpError(errorMessage))
  }
}

function* signInSaga(action) {
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

      if (!userData || !userData.email) {
        throw new Error()
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
    const errorMessage = error.message || ''
    yield put(signInError(errorMessage))
    return
  }

  yield put(
    signInSuccess({
      id: currentUser.id,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      role: currentUser.role,
      isRemovable: currentUser.isRemovable,
    })
  )
}

function* signOutSaga(action) {
  const { history, location } = action.payload
  yield localStorage.removeItem(STORAGE_FIELD_USER_ID)
  yield localStorage.removeItem(STORAGE_FIELD_TOKEN)
  yield put(signOutSuccess())

  if (location.pathname.indexOf(ADMIN_PAGE_PATH) !== -1) {
    history.push(SING_IN_PAGE_PATH)
  }
}

function* watchFetchUsers() {
  yield takeEvery(FETCH_USERS, fetchUsersSaga)
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP, signUpSaga)
}

function* watchSignIn() {
  yield takeEvery(SIGN_IN, signInSaga)
}

function* watchSignOut() {
  yield takeEvery(SIGN_OUT, signOutSaga)
}

export { watchFetchUsers, watchSignUp, watchSignIn, watchSignOut }
