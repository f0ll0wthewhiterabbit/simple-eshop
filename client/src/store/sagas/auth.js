/* eslint-disable no-console */
import { takeEvery, put, call } from 'redux-saga/effects'

import API from '../../utils/api'
import { FIELDS, PAGE_PATHS, ROLES, PAGE_LIMITS } from '../../constants'
import {
  authenticateRequest,
  authenticateSuccess,
  authenticateError,
  signUpRequest,
  signUpSuccess,
  signUpError,
  signInRequest,
  signInSuccess,
  signInError,
  signOutRequest,
  signOutSuccess,
  setProductsPerPage,
} from '../actions'
import setAuthToken from '../../utils/setAuthToken'
import isTokenExpired from '../../utils/isTokenExpired'
import convertToRecord from '../../utils/convertToRecord'

export function* handleAuthenticateRequest() {
  try {
    const accessToken = yield call([localStorage, 'getItem'], FIELDS.STORAGE_ACCESS_TOKEN)

    if (accessToken) {
      const isExpired = yield call(isTokenExpired, accessToken)

      if (!isExpired) {
        yield call(setAuthToken, accessToken)
      } else {
        const refreshToken = yield call([localStorage, 'getItem'], FIELDS.STORAGE_REFRESH_TOKEN)
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const body = JSON.stringify({ refreshToken })

        const response = yield call(API.post, '/auth/token', body, config)
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data

        yield call([localStorage, 'setItem'], FIELDS.STORAGE_ACCESS_TOKEN, newAccessToken)
        yield call([localStorage, 'setItem'], FIELDS.STORAGE_REFRESH_TOKEN, newRefreshToken)
        yield call(setAuthToken, newAccessToken)
      }
    } else {
      yield put(authenticateError(''))
      return
    }

    const response = yield call(API.get, '/auth')
    const { _id: id, firstName, lastName, email, role, isRemovable } = response.data
    const userData = convertToRecord({ id, firstName, lastName, email, role, isRemovable })

    if (role === ROLES.ADMIN) {
      yield put(setProductsPerPage(PAGE_LIMITS.ADMIN_DEFAULT))
    }

    yield put(authenticateSuccess(userData))
  } catch (error) {
    const errorMessage = error.response.data.errors
      ? error.response.data.errors[0].msg
      : 'Authentication failed!'
    const refreshToken = yield call([localStorage, 'getItem'], FIELDS.STORAGE_REFRESH_TOKEN)

    if (refreshToken) {
      yield put(signOutRequest())
    }

    yield call([localStorage, 'removeItem'], FIELDS.STORAGE_ACCESS_TOKEN)
    yield put(authenticateError(errorMessage))
  }
}

export function* handleSignUpRequest(action) {
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

    yield call([localStorage, 'setItem'], FIELDS.STORAGE_ACCESS_TOKEN, accessToken)
    yield put(signUpSuccess(accessToken))
    yield put(authenticateRequest())
  } catch (error) {
    const errorMessage = error.response.data.errors
      ? error.response.data.errors[0].msg
      : 'Registration failed! Something went wrong.'

    yield call([localStorage, 'removeItem'], FIELDS.STORAGE_ACCESS_TOKEN)
    yield put(signUpError(errorMessage))
    yield action.payload.setFormSubmitting(false)
  }
}

export function* handleSignInRequest(action) {
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

    yield call([localStorage, 'setItem'], FIELDS.STORAGE_ACCESS_TOKEN, accessToken)

    if (refreshToken) {
      yield call([localStorage, 'setItem'], FIELDS.STORAGE_REFRESH_TOKEN, refreshToken)
    }

    yield put(signInSuccess(accessToken))
    yield put(authenticateRequest())
  } catch (error) {
    const errorMessage = error.response.data.errors
      ? error.response.data.errors[0].msg
      : 'Unable to login! Something went wrong!'

    yield call([localStorage, 'removeItem'], FIELDS.STORAGE_ACCESS_TOKEN)
    yield put(signInError(errorMessage))
    yield action.payload.setFormSubmitting(false)
  }
}

export function* handleSignOutRequest(action) {
  const { history, location } = action.payload
  const refreshToken = yield call([localStorage, 'getItem'], FIELDS.STORAGE_REFRESH_TOKEN)

  try {
    if (refreshToken) {
      const config = {
        data: JSON.stringify({ refreshToken }),
        headers: {
          'Content-Type': 'application/json',
        },
      }

      yield call(API.delete, '/auth/token', config)
    }
  } catch (err) {
    console.error(err)
  } finally {
    if (refreshToken) {
      yield call([localStorage, 'removeItem'], FIELDS.STORAGE_REFRESH_TOKEN)
    }

    yield call([localStorage, 'removeItem'], FIELDS.STORAGE_ACCESS_TOKEN)
    yield put(signOutSuccess())

    if (
      location &&
      history &&
      (location.pathname.indexOf(PAGE_PATHS.ADMIN) !== -1 ||
        location.pathname.indexOf(PAGE_PATHS.ERROR) !== -1)
    ) {
      history.push(PAGE_PATHS.SIGN_IN)
    }
  }
}

function* watchAuthenticateRequest() {
  yield takeEvery(authenticateRequest, handleAuthenticateRequest)
}

function* watchSignUpRequest() {
  yield takeEvery(signUpRequest, handleSignUpRequest)
}

function* watchSignInRequest() {
  yield takeEvery(signInRequest, handleSignInRequest)
}

function* watchSignOutRequest() {
  yield takeEvery(signOutRequest, handleSignOutRequest)
}

export { watchAuthenticateRequest, watchSignUpRequest, watchSignInRequest, watchSignOutRequest }
