import { createAction } from 'redux-actions'

export const showModal = createAction('APP/SHOW_MODAL', storeFieldNameForModal => ({
  storeFieldNameForModal,
}))
export const closeModal = createAction('APP/CLOSE_MODAL')
export const openSidebar = createAction('APP/OPEN_SIDEBAR')
export const closeSidebar = createAction('APP/CLOSE_SIDEBAR')
export const toggleTheme = createAction('APP/TOGGLE_THEME', theme => ({ theme }))
export const getThemeFromStorage = createAction('APP/GET_THEME_FROM_STORAGE')
export const initialize = createAction('APP/INITIALIZE')
