import {
  FETCH_DATABASE_TO_STORAGE,
  FETCH_DATABASE_TO_STORAGE_SUCCESS,
  FETCH_DATABASE_TO_STORAGE_ERROR,
  SHOW_MODAL,
  CLOSE_MODAL,
  TURN_ON_ADMIN_MODE,
  DELETE_SELECTED_ITEMS,
  START_LOADING,
  STOP_LOADING,
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

export const turnOnAdminMode = () => ({
  type: TURN_ON_ADMIN_MODE,
})

export const deleteSelectedItems = storeFieldName => ({
  type: DELETE_SELECTED_ITEMS,
  payload: storeFieldName,
})

export const startLoading = () => ({
  type: START_LOADING,
})

export const stopLoading = () => ({
  type: STOP_LOADING,
})
