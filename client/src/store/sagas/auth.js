import { takeEvery, put, call } from 'redux-saga/effects'

import API from '../../utils/api'
import {
  STORAGE_FIELD_TOKEN,
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

export function* handleAuthenticate() {
  const token = yield call([localStorage, 'getItem'], STORAGE_FIELD_TOKEN)

  if (token) {
    yield call(setAuthToken, token)
  } else {
    yield put(authenticateError(''))
    return
  }

  try {
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

    yield call([localStorage, 'removeItem'], STORAGE_FIELD_TOKEN)
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
    const { token } = response.data

    yield call([localStorage, 'setItem'], STORAGE_FIELD_TOKEN, token)
    yield put(signUpSuccess(token))
    yield put(authenticate())
  } catch (error) {
    const errorMessage = error.response.data.errors
      ? error.response.data.errors[0].msg
      : 'Registration failed! Something went wrong.'

    yield call([localStorage, 'removeItem'], STORAGE_FIELD_TOKEN)
    yield put(signUpError(errorMessage))
    yield action.payload.setFormSubmitting(false)
  }
}

export function* handleSignIn(action) {
  const { email, password } = action.payload.userData
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify({ email, password })

  try {
    const response = yield call(API.post, '/auth', body, config)
    const { token } = response.data

    yield call([localStorage, 'setItem'], STORAGE_FIELD_TOKEN, token)
    yield put(signInSuccess(token))
    yield put(authenticate())
  } catch (error) {
    const errorMessage = error.response.data.errors
      ? error.response.data.errors[0].msg
      : 'Unable to login! Something went wrong!'

    yield call([localStorage, 'removeItem'], STORAGE_FIELD_TOKEN)
    yield put(signInError(errorMessage))
    yield action.payload.setFormSubmitting(false)
  }
}

export function* handleSignOut(action) {
  const { history, location } = action.payload
  yield call([localStorage, 'removeItem'], STORAGE_FIELD_TOKEN)
  yield put(signOutSuccess())

  if (
    location.pathname.indexOf(ADMIN_PAGE_PATH) !== -1 ||
    location.pathname.indexOf(ERROR_PAGE_PATH) !== -1
  ) {
    history.push(SIGN_IN_PAGE_PATH)
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
