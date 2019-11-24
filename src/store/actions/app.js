import {
  FETCH_DATABASE_TO_STORAGE,
  FETCH_DATABASE_TO_STORAGE_SUCCESS,
  FETCH_DATABASE_TO_STORAGE_ERROR,
  SHOW_MODAL,
  CLOSE_MODAL,
  DELETE_ITEMS,
  START_LOADING,
  STOP_LOADING,
  INITIALIZE,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
} from '../../constants'

export const fetchDatabaseToStorage = () => ({
  type: FETCH_DATABASE_TO_STORAGE,
})

export const fetchDatabaseToStorageSuccess = () => ({
  type: FETCH_DATABASE_TO_STORAGE_SUCCESS,
})

export const fetchDatabaseToStorageError = error => ({
  type: FETCH_DATABASE_TO_STORAGE_ERROR,
  payload: error,
})

export const showModal = storeFieldNameForModal => ({
  type: SHOW_MODAL,
  payload: storeFieldNameForModal,
})

export const closeModal = () => ({
  type: CLOSE_MODAL,
})

export const deleteItems = storeFieldName => ({
  type: DELETE_ITEMS,
  payload: storeFieldName,
})

export const startLoading = () => ({
  type: START_LOADING,
})

export const stopLoading = () => ({
  type: STOP_LOADING,
})

export const initialize = () => ({
  type: INITIALIZE,
})

export const openSidebar = () => ({
  type: OPEN_SIDEBAR,
})

export const closeSidebar = () => ({
  type: CLOSE_SIDEBAR,
})
