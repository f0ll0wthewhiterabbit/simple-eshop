import { createActions } from 'redux-actions'

const { app } = createActions({
  APP: {
    SHOW_MODAL: storeFieldNameForModal => ({ storeFieldNameForModal }),
    CLOSE_MODAL: undefined,
    OPEN_SIDEBAR: undefined,
    CLOSE_SIDEBAR: undefined,
  },
})

export const { showModal, closeModal, openSidebar, closeSidebar } = app
