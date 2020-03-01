import { createAction } from 'redux-actions'

export const initializeRequest = createAction('APP/INITIALIZE_REQUEST')

export const toggleThemeRequest = createAction('APP/TOGGLE_THEME_REQUEST', theme => ({ theme }))

export const getThemeFromStorageRequest = createAction('APP/GET_THEME_FROM_STORAGE_REQUEST')

export const showModal = createAction('APP/SHOW_MODAL', storeFieldNameForModal => ({
  storeFieldNameForModal,
}))
export const closeModal = createAction('APP/CLOSE_MODAL')

export const openSidebar = createAction('APP/OPEN_SIDEBAR')
export const closeSidebar = createAction('APP/CLOSE_SIDEBAR')
