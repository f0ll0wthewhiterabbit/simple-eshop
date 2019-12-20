import { createAction } from 'redux-actions'

export const showModal = createAction('APP/SHOW_MODAL', storeFieldNameForModal => ({
  storeFieldNameForModal,
}))
export const closeModal = createAction('APP/CLOSE_MODAL')
export const openSidebar = createAction('APP/OPEN_SIDEBAR')
export const closeSidebar = createAction('APP/CLOSE_SIDEBAR')
