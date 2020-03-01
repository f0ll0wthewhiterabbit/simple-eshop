import { Record } from 'immutable'

import appReducer from './app'
import { showModal, closeModal, openSidebar, closeSidebar, toggleThemeRequest } from '../actions'
import { FIELDS } from '../../constants'

describe('App reducer', () => {
  const initialState = Record({
    isModalOpened: false,
    storeFieldNameForModal: '',
    isSidebarOpened: false,
    theme: FIELDS.THEME_DEFAULT,
  })()
  const testFieldName = 'test field name'

  it('should return the initial state', () => {
    const receivedState = appReducer(undefined, {})

    expect(receivedState.hashCode()).toBe(initialState.hashCode())
  })

  it('should handle [showModal] action', () => {
    const receivedState = appReducer(undefined, showModal(testFieldName))

    expect(receivedState.storeFieldNameForModal).toBe(testFieldName)
    expect(receivedState.isModalOpened).toBe(true)
  })

  it('should handle [closeModal] action', () => {
    const stateAfterModalOpen = appReducer(undefined, showModal(testFieldName))
    const receivedState = appReducer(stateAfterModalOpen, closeModal())

    expect(receivedState.storeFieldNameForModal).toBe(initialState.storeFieldNameForModal)
    expect(receivedState.isModalOpened).toBe(initialState.isModalOpened)
  })

  it('should handle [openSidebar] action', () => {
    const receivedState = appReducer(undefined, openSidebar())

    expect(receivedState.isSidebarOpened).toBe(true)
  })

  it('should handle [closeSidebar] action', () => {
    const stateAfterSidebarOpen = appReducer(undefined, openSidebar(testFieldName))
    const receivedState = appReducer(stateAfterSidebarOpen, closeSidebar())

    expect(receivedState.isSidebarOpened).toBe(initialState.isSidebarOpened)
  })

  it('should handle [toggleThemeRequest] action', () => {
    const receivedState = appReducer(undefined, toggleThemeRequest(FIELDS.THEME_DARK))

    expect(receivedState.theme).toBe(FIELDS.THEME_DARK)
  })
})
