import { createActions } from 'redux-actions'

const { app } = createActions({
  APP: {
    SHOW_MODAL: storeFieldNameForModal => ({ storeFieldNameForModal }),
    CLOSE_MODAL: undefined,
    START_PAGE_LOADING: undefined,
    STOP_PAGE_LOADING: undefined,
    OPEN_SIDEBAR: undefined,
    CLOSE_SIDEBAR: undefined,
  },
})

export const {
  showModal,
  closeModal,
  startPageLoading,
  stopPageLoading,
  openSidebar,
  closeSidebar,
} = app
