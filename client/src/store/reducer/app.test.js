import { Record } from 'immutable'

import appReducer from './app'
import { showModal, closeModal, openSidebar, closeSidebar, toggleTheme } from '../actions'
import { FIELD_THEME_DEFAULT, FIELD_THEME_DARK } from '../../constants'

describe('App reducer', () => {
  const initialState = Record({
    isModalOpened: false,
    storeFieldNameForModal: '',
    isSidebarOpened: false,
    theme: FIELD_THEME_DEFAULT,
  })()
  const testFieldName = 'test field name'

  it('should return the initial state', () => {
    const recievedState = appReducer(undefined, {})

    expect(recievedState.hashCode()).toBe(initialState.hashCode())
  })

  it('should handle [showModal] action', () => {
    const recievedState = appReducer(undefined, showModal(testFieldName))

    expect(recievedState.storeFieldNameForModal).toBe(testFieldName)
    expect(recievedState.isModalOpened).toBe(true)
  })

  it('should handle [closeModal] action', () => {
    const stateAfterModalOpen = appReducer(undefined, showModal(testFieldName))
    const recievedState = appReducer(stateAfterModalOpen, closeModal())

    expect(recievedState.storeFieldNameForModal).toBe(initialState.storeFieldNameForModal)
    expect(recievedState.isModalOpened).toBe(initialState.isModalOpened)
  })

  it('should handle [openSidebar] action', () => {
    const recievedState = appReducer(undefined, openSidebar())

    expect(recievedState.isSidebarOpened).toBe(true)
  })

  it('should handle [closeSidebar] action', () => {
    const stateAfterSidebarOpen = appReducer(undefined, openSidebar(testFieldName))
    const recievedState = appReducer(stateAfterSidebarOpen, closeSidebar())

    expect(recievedState.isSidebarOpened).toBe(initialState.isSidebarOpened)
  })

  it('should handle [toggleTheme] action', () => {
    const recievedState = appReducer(undefined, toggleTheme(FIELD_THEME_DARK))

    expect(recievedState.theme).toBe(FIELD_THEME_DARK)
  })
})
