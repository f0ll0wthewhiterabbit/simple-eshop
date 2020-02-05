import { takeEvery, put, call } from 'redux-saga/effects'

import API from '../../utils/api'
import {
  STORAGE_FIELD_ACCESS_TOKEN,
  STORAGE_FIELD_REFRESH_TOKEN,
  ADMIN_PAGE_PATH,
  SIGN_IN_PAGE_PATH,
  ERROR_PAGE_PATH,
  ROLE_ADMIN,
  DEFAULT_ADMIN_PER_PAGE_LIMIT,
} from '../../constants'
import {
  signUpSuccess,
  signUpError,
  authenticateSuccess,
  authenticateError,
  signInSuccess,
  signInError,
  signOutSuccess,
  authenticate,
  signUp,
  signIn,
  signOut,
  setProductsPerPage,
} from '../actions'
import setAuthToken from '../../utils/setAuthToken'
import isTokenExpired from '../../utils/isTokenExpired'

export function* handleAuthenticate() {
  try {
    const accessToken = yield call([localStorage, 'getItem'], STORAGE_FIELD_ACCESS_TOKEN)

    if (accessToken) {
      const isExpired = yield call(isTokenExpired, accessToken)

      if (!isExpired) {
        yield call(setAuthToken, accessToken)
      } else {
        const refreshToken = yield call([localStorage, 'getItem'], STORAGE_FIELD_REFRESH_TOKEN)
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const body = JSON.stringify({ refreshToken })

        const response = yield call(API.post, '/auth/token', body, config)
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data

        yield call([localStorage, 'setItem'], STORAGE_FIELD_ACCESS_TOKEN, newAccessToken)
        yield call([localStorage, 'setItem'], STORAGE_FIELD_REFRESH_TOKEN, newRefreshToken)
        yield call(setAuthToken, newAccessToken)
      }
    } else {
      yield put(authenticateError(''))
      return
    }

    const response = yield call(API.get, '/auth')
    const { _id: id, firstName, lastName, email, role, isRemovable } = response.data
    const userData = { id, firstName, lastName, email, role, isRemovable }

    if (role === ROLE_ADMIN) {
      yield put(setProductsPerPage(DEFAULT_ADMIN_PER_PAGE_LIMIT))
    }

    yield put(authenticateSuccess(userData))
  } catch (error) {
    const errorMessage = error.response.data.errors
      ? error.response.data.errors[0].msg
      : 'Authentication failed!'
    const refreshToken = yield call([localStorage, 'getItem'], STORAGE_FIELD_REFRESH_TOKEN)

    if (refreshToken) {
      yield put(signOut())
    }

    yield call([localStorage, 'removeItem'], STORAGE_FIELD_ACCESS_TOKEN)
    yield put(authenticateError(errorMessage))
  }
}

export function* handleSignUp(action) {
  const { firstName, lastName, email, password } = action.payload.userData
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify({ firstName, lastName, email, password })

  try {
    const response = yield call(API.post, '/users', body, config)
    const { accessToken } = response.data

    yield call([localStorage, 'setItem'], STORAGE_FIELD_ACCESS_TOKEN, accessToken)
    yield put(signUpSuccess(accessToken))
    yield put(authenticate())
  } catch (error) {
    const errorMessage = error.response.data.errors
      ? error.response.data.errors[0].msg
      : 'Registration failed! Something went wrong.'

    yield call([localStorage, 'removeItem'], STORAGE_FIELD_ACCESS_TOKEN)
    yield put(signUpError(errorMessage))
    yield action.payload.setFormSubmitting(false)
  }
}

export function* handleSignIn(action) {
  const { email, password, rememberMe } = action.payload.userData
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify({ email, password, rememberMe })

  try {
    const response = yield call(API.post, '/auth', body, config)
    const { accessToken, refreshToken } = response.data

    yield call([localStorage, 'setItem'], STORAGE_FIELD_ACCESS_TOKEN, accessToken)

    if (refreshToken) {
      yield call([localStorage, 'setItem'], STORAGE_FIELD_REFRESH_TOKEN, refreshToken)
    }

    yield put(signInSuccess(accessToken))
    yield put(authenticate())
  } catch (error) {
    const errorMessage = error.response.data.errors
      ? error.response.data.errors[0].msg
      : 'Unable to login! Something went wrong!'

    yield call([localStorage, 'removeItem'], STORAGE_FIELD_ACCESS_TOKEN)
    yield put(signInError(errorMessage))
    yield action.payload.setFormSubmitting(false)
  }
}

export function* handleSignOut(action) {
  try {
    const { history, location } = action.payload
    const refreshToken = yield call([localStorage, 'getItem'], STORAGE_FIELD_REFRESH_TOKEN)

    if (refreshToken) {
      const config = {
        data: JSON.stringify({ refreshToken }),
        headers: {
          'Content-Type': 'application/json',
        },
      }

      yield call(API.delete, '/auth/token', config)
      yield call([localStorage, 'removeItem'], STORAGE_FIELD_REFRESH_TOKEN)
    }

    yield call([localStorage, 'removeItem'], STORAGE_FIELD_ACCESS_TOKEN)
    yield put(signOutSuccess())

    if (
      location &&
      history &&
      (location.pathname.indexOf(ADMIN_PAGE_PATH) !== -1 ||
        location.pathname.indexOf(ERROR_PAGE_PATH) !== -1)
    ) {
      history.push(SIGN_IN_PAGE_PATH)
    }
  } catch (err) {
    return err
  }
}

function* watchAuthenticate() {
  yield takeEvery(authenticate, handleAuthenticate)
}

function* watchSignUp() {
  yield takeEvery(signUp, handleSignUp)
}

function* watchSignIn() {
  yield takeEvery(signIn, handleSignIn)
}

function* watchSignOut() {
  yield takeEvery(signOut, handleSignOut)
}

export { watchAuthenticate, watchSignUp, watchSignIn, watchSignOut }
