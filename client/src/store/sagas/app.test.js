import { call, put } from 'redux-saga/effects'

import { FIELD_THEME_DEFAULT, STORAGE_FIELD_THEME, FIELD_THEME_DARK } from '../../constants'
import { handleToggleTheme, handleGetThemeFromStorage, handleInitialize } from './app'
import { toggleTheme, getThemeFromStorage, authenticate } from '../actions'

describe('App sagas', () => {
  it('should handle toggleTheme', () => {
    const action = { payload: { theme: FIELD_THEME_DEFAULT } }
    const { theme } = action.payload
    const gen = handleToggleTheme(action)

    expect(gen.next().value).toEqual(call([localStorage, 'setItem'], STORAGE_FIELD_THEME, theme))
  })

  it('should handle getThemeFromStorage', () => {
    const gen = handleGetThemeFromStorage()

    expect(gen.next().value).toEqual(call([localStorage, 'getItem'], STORAGE_FIELD_THEME))
    expect(gen.next(FIELD_THEME_DARK).value).toEqual(put(toggleTheme(FIELD_THEME_DARK)))
  })

  it('should handle handleInitialize', () => {
    const gen = handleInitialize()

    expect(gen.next().value).toEqual(put(getThemeFromStorage()))
    expect(gen.next().value).toEqual(put(authenticate()))
  })
})
