import { call, put } from 'redux-saga/effects'

import { FIELDS } from '../../constants'
import {
  handleToggleThemeRequest,
  handleGetThemeFromStorageRequest,
  handleInitializeRequest,
} from './app'
import { toggleThemeRequest, getThemeFromStorageRequest, authenticateRequest } from '../actions'

describe('App sagas', () => {
  it('should handle toggleThemeRequest', () => {
    const action = { payload: { theme: FIELDS.THEME_DEFAULT } }
    const { theme } = action.payload
    const gen = handleToggleThemeRequest(action)

    expect(gen.next().value).toEqual(call([localStorage, 'setItem'], FIELDS.STORAGE_THEME, theme))
  })

  it('should handle getThemeFromStorageRequest', () => {
    const gen = handleGetThemeFromStorageRequest()

    expect(gen.next().value).toEqual(call([localStorage, 'getItem'], FIELDS.STORAGE_THEME))
    expect(gen.next(FIELDS.THEME_DARK).value).toEqual(put(toggleThemeRequest(FIELDS.THEME_DARK)))
  })

  it('should handle handleInitializeRequest', () => {
    const gen = handleInitializeRequest()

    expect(gen.next().value).toEqual(put(getThemeFromStorageRequest()))
    expect(gen.next().value).toEqual(put(authenticateRequest()))
  })
})
