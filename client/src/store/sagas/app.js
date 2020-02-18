import { takeEvery, call, put } from 'redux-saga/effects'

import { toggleTheme, getThemeFromStorage, initialize, authenticate } from '../actions'
import { STORAGE_FIELD_THEME, FIELD_THEME_DARK } from '../../constants'

export function* handleToggleThme(action) {
  const { theme } = action.payload

  yield call([localStorage, 'setItem'], STORAGE_FIELD_THEME, theme)
}

export function* handleGetThemeFromStorage() {
  const theme = yield call([localStorage, 'getItem'], STORAGE_FIELD_THEME)

  if (theme === FIELD_THEME_DARK) {
    yield put(toggleTheme(FIELD_THEME_DARK))
  }
}

export function* handleInitialize() {
  yield put(getThemeFromStorage())
  yield put(authenticate())
}

function* watchToggleTheme() {
  yield takeEvery(toggleTheme, handleToggleThme)
}

function* watchGetThemeFromStorage() {
  yield takeEvery(getThemeFromStorage, handleGetThemeFromStorage)
}

function* watchInitialize() {
  yield takeEvery(initialize, handleInitialize)
}

export { watchToggleTheme, watchGetThemeFromStorage, watchInitialize }
