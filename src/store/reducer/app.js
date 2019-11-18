import { FETCH_DATABASE_TO_STORAGE_SUCCESS, FETCH_DATABASE_TO_STORAGE_ERROR } from '../../constants'

const initialState = {
  isAdminMode: false,
  isStorageDataReady: false,
  storageSetupError: false,
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

    default:
      return state
  }
}

export default app
