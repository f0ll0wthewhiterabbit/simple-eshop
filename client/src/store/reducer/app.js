import {
  SHOW_MODAL,
  CLOSE_MODAL,
  START_PAGE_LOADING,
  STOP_PAGE_LOADING,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
} from '../../constants'

const initialState = {
  isLoading: false,
  modal: {
    isOpened: false,
    storeFieldName: '',
  },
  isSidebarOpened: false,
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpened: true,
          storeFieldName: action.payload.storeFieldNameForModal,
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

    case START_PAGE_LOADING:
      return {
        ...state,
        isLoading: true,
      }

    case STOP_PAGE_LOADING:
      return {
        ...state,
        isLoading: false,
      }

    case OPEN_SIDEBAR:
      return {
        ...state,
        isSidebarOpened: true,
      }

    case CLOSE_SIDEBAR:
      return {
        ...state,
        isSidebarOpened: false,
      }

    default:
      return state
  }
}

export default app
