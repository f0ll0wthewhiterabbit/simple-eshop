import {
  SHOW_MODAL,
  CLOSE_MODAL,
  START_PAGE_LOADING,
  STOP_PAGE_LOADING,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
} from '../../constants'

export const showModal = storeFieldNameForModal => ({
  type: SHOW_MODAL,
  payload: { storeFieldNameForModal },
})

export const closeModal = () => ({
  type: CLOSE_MODAL,
})

export const startPageLoading = () => ({
  type: START_PAGE_LOADING,
})

export const stopPageLoading = () => ({
  type: STOP_PAGE_LOADING,
})

export const openSidebar = () => ({
  type: OPEN_SIDEBAR,
})

export const closeSidebar = () => ({
  type: CLOSE_SIDEBAR,
})
