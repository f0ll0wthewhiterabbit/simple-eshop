import {
  FETCH_DATABASE_TO_STORAGE_SUCCESS,
  FETCH_DATABASE_TO_STORAGE_ERROR,
  SHOW_MODAL,
  CLOSE_MODAL,
} from '../../constants'

const initialState = {
  isAdminMode: false,
  isStorageDataReady: false,
  storageSetupError: false,
  isModalOpened: false,
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATABASE_TO_STORAGE_SUCCESS:
      return {
        ...state,
        isStorageDataReady: true,
        storageSetupError: false,
      }

    case FETCH_DATABASE_TO_STORAGE_ERROR:
      return {
        ...state,
        isStorageDataReady: false,
        storageSetupError: true,
      }

    case SHOW_MODAL:
      return {
        ...state,
        isModalOpened: true,
      }

    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpened: false,
      }

    default:
      return state
  }
}

export default app
