import { takeEvery, call, put } from 'redux-saga/effects'

import {
  toggleThemeRequest,
  getThemeFromStorageRequest,
  initializeRequest,
  authenticateRequest,
} from '../actions'
import { FIELDS } from '../../constants'

export function* handleToggleThemeRequest(action) {
  const { theme } = action.payload

  yield call([localStorage, 'setItem'], FIELDS.STORAGE_THEME, theme)
}

export function* handleGetThemeFromStorageRequest() {
  const theme = yield call([localStorage, 'getItem'], FIELDS.STORAGE_THEME)

  if (theme === FIELDS.THEME_DARK) {
    yield put(toggleThemeRequest(FIELDS.THEME_DARK))
  }
}

export function* handleInitializeRequest() {
  yield put(getThemeFromStorageRequest())
  yield put(authenticateRequest())
}

function* watchToggleThemeRequest() {
  yield takeEvery(toggleThemeRequest, handleToggleThemeRequest)
}

function* watchGetThemeFromStorageRequest() {
  yield takeEvery(getThemeFromStorageRequest, handleGetThemeFromStorageRequest)
}

function* watchInitializeRequest() {
  yield takeEvery(initializeRequest, handleInitializeRequest)
}

export { watchToggleThemeRequest, watchGetThemeFromStorageRequest, watchInitializeRequest }
