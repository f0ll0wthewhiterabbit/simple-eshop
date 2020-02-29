import { call, put } from 'redux-saga/effects'

import { FIELDS } from '../../constants'
import { handleToggleTheme, handleGetThemeFromStorage, handleInitialize } from './app'
import { toggleTheme, getThemeFromStorage, authenticate } from '../actions'

describe('App sagas', () => {
  it('should handle toggleTheme', () => {
    const action = { payload: { theme: FIELDS.THEME_DEFAULT } }
    const { theme } = action.payload
    const gen = handleToggleTheme(action)

    expect(gen.next().value).toEqual(call([localStorage, 'setItem'], FIELDS.STORAGE_THEME, theme))
  })

  it('should handle getThemeFromStorage', () => {
    const gen = handleGetThemeFromStorage()

    expect(gen.next().value).toEqual(call([localStorage, 'getItem'], FIELDS.STORAGE_THEME))
    expect(gen.next(FIELDS.THEME_DARK).value).toEqual(put(toggleTheme(FIELDS.THEME_DARK)))
  })

  it('should handle handleInitialize', () => {
    const gen = handleInitialize()

    expect(gen.next().value).toEqual(put(getThemeFromStorage()))
    expect(gen.next().value).toEqual(put(authenticate()))
  })
})
