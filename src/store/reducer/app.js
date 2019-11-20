import {
  FETCH_DATABASE_TO_STORAGE_SUCCESS,
  FETCH_DATABASE_TO_STORAGE_ERROR,
  SHOW_MODAL,
  CLOSE_MODAL,
  START_LOADING,
  STOP_LOADING,
} from '../../constants'

const initialState = {
  isAdminMode: false,
  isLoading: false,
  isStorageDataReady: false,
  storageSetupError: false,
  modal: {
    isOpened: false,
    storeFieldName: '',
  },
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
        modal: {
          ...state.modal,
          isOpened: true,
          storeFieldName: action.payload,
        },
      }

    case CLOSE_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpened: false,
          storeFieldName: '',
        },
      }

    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      }

    case STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state
  }
}

export default app
