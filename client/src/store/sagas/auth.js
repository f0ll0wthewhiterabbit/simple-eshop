import { takeEvery, put } from 'redux-saga/effects'

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

function* authenticateSaga() {
  const token = yield localStorage.getItem(STORAGE_FIELD_TOKEN)

  if (token) {
    setAuthToken(token)
  } else {
    yield put(authenticateError(''))
    return
  }

  try {
    const response = yield API.get('/auth')
    const { _id: id, firstName, lastName, email, role, isRemovable } = response.data
    const userData = { id, firstName, lastName, email, role, isRemovable }

    if (role === ROLE_ADMIN) {
      yield put(setProductsPerPage(DEFAULT_ADMIN_PER_PAGE_LIMIT))
    }

    yield put(authenticateSuccess(userData))
  } catch (error) {
    const errorMessage = error.response.data.errors[0].msg || 'Authentication failed!'

    yield localStorage.removeItem(STORAGE_FIELD_TOKEN)
    yield put(authenticateError(errorMessage))
  }
}

function* signUpSaga(action) {
  const { firstName, lastName, email, password } = action.payload.userData
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify({ firstName, lastName, email, password })

  try {
    const response = yield API.post('/users', body, config)
    const { token } = response.data

    yield localStorage.setItem(STORAGE_FIELD_TOKEN, token)
    yield put(signUpSuccess(token))
    yield put(authenticate())
  } catch (error) {
    const errorMessage =
      error.response.data.errors[0].msg || 'Registration failed! Something went wrong.'

    yield localStorage.removeItem(STORAGE_FIELD_TOKEN)
    yield put(signUpError(errorMessage))
    yield action.payload.setFormSubmitting(false)
  }
}

function* signInSaga(action) {
  const { email, password } = action.payload.userData
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify({ email, password })

  try {
    const response = yield API.post('/auth', body, config)
    const { token } = response.data

    yield localStorage.setItem(STORAGE_FIELD_TOKEN, token)
    yield put(signInSuccess(token))
    yield put(authenticate())
  } catch (error) {
    const errorMessage =
      error.response.data.errors[0].msg || 'Registration failed! Something went wrong.'

    yield localStorage.removeItem(STORAGE_FIELD_TOKEN)
    yield put(signInError(errorMessage))
    yield action.payload.setFormSubmitting(false)
  }
}

function* signOutSaga(action) {
  const { history, location } = action.payload
  yield localStorage.removeItem(STORAGE_FIELD_TOKEN)
  yield put(signOutSuccess())

  if (
    location.pathname.indexOf(ADMIN_PAGE_PATH) !== -1 ||
    location.pathname.indexOf(ERROR_PAGE_PATH) !== -1
  ) {
    history.push(SIGN_IN_PAGE_PATH)
  }
}

function* watchAuthenticate() {
  yield takeEvery(authenticate, authenticateSaga)
}

function* watchSignUp() {
  yield takeEvery(signUp, signUpSaga)
}

function* watchSignIn() {
  yield takeEvery(signIn, signInSaga)
}

function* watchSignOut() {
  yield takeEvery(signOut, signOutSaga)
}

export { watchAuthenticate, watchSignUp, watchSignIn, watchSignOut }
