import {
  SHOW_MODAL,
  CLOSE_MODAL,
  START_LOADING,
  STOP_LOADING,
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

export const startLoading = () => ({
  type: START_LOADING,
})

export const stopLoading = () => ({
  type: STOP_LOADING,
})

export const openSidebar = () => ({
  type: OPEN_SIDEBAR,
})

export const closeSidebar = () => ({
  type: CLOSE_SIDEBAR,
})
