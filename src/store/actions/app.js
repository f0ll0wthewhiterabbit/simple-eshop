import {
  FETCH_DATABASE_TO_STORAGE,
  FETCH_DATABASE_TO_STORAGE_SUCCESS,
  FETCH_DATABASE_TO_STORAGE_ERROR,
  SHOW_MODAL,
  CLOSE_MODAL,
  TURN_ON_ADMIN_MODE,
} from '../../constants'

export const fetchDatabaseToStorage = () => ({
  type: FETCH_DATABASE_TO_STORAGE,
})

export const fetchDatabaseToStorageSuccess = () => ({
  type: FETCH_DATABASE_TO_STORAGE_SUCCESS,
})

export const fetchDatabaseToStorageError = () => ({
  type: FETCH_DATABASE_TO_STORAGE_ERROR,
})

export const showModal = () => ({
  type: SHOW_MODAL,
})

export const closeModal = () => ({
  type: CLOSE_MODAL,
})

export const turnOnAdminMode = () => ({
  type: TURN_ON_ADMIN_MODE,
})
