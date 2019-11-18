import {
  FETCH_DATABASE_TO_STORAGE,
  TURN_ON_ADMIN_MODE,
  FETCH_DATABASE_TO_STORAGE_SUCCESS,
  FETCH_DATABASE_TO_STORAGE_ERROR,
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

export const turnOnAdminMode = () => ({
  type: TURN_ON_ADMIN_MODE,
})
