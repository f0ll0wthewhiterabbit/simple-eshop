import { takeEvery, call, put } from 'redux-saga/effects'

import { toggleTheme, getThemeFromStorage, initialize, authenticate } from '../actions'
import { FIELDS } from '../../constants'

export function* handleToggleTheme(action) {
  const { theme } = action.payload

  yield call([localStorage, 'setItem'], FIELDS.STORAGE_THEME, theme)
}

export function* handleGetThemeFromStorage() {
  const theme = yield call([localStorage, 'getItem'], FIELDS.STORAGE_THEME)

  if (theme === FIELDS.THEME_DARK) {
    yield put(toggleTheme(FIELDS.THEME_DARK))
  }
}

export function* handleInitialize() {
  yield put(getThemeFromStorage())
  yield put(authenticate())
}

function* watchToggleTheme() {
  yield takeEvery(toggleTheme, handleToggleTheme)
}

function* watchGetThemeFromStorage() {
  yield takeEvery(getThemeFromStorage, handleGetThemeFromStorage)
}

function* watchInitialize() {
  yield takeEvery(initialize, handleInitialize)
}

export { watchToggleTheme, watchGetThemeFromStorage, watchInitialize }
