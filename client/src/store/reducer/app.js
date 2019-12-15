import { handleActions } from 'redux-actions'

import {
  showModal,
  closeModal,
  startPageLoading,
  stopPageLoading,
  openSidebar,
  closeSidebar,
} from '../actions'

const initialState = {
  isLoading: false,
  modal: {
    isOpened: false,
    storeFieldName: '',
  },
  isSidebarOpened: false,
}

const app = handleActions(
  {
    [showModal]: (state, action) => ({
      ...state,
      modal: {
        ...state.modal,
        isOpened: true,
        storeFieldName: action.payload.storeFieldNameForModal,
      },
    }),
    [closeModal]: state => ({
      ...state,
      modal: {
        ...state.modal,
        isOpened: false,
        storeFieldName: '',
      },
    }),
    [startPageLoading]: state => ({
      ...state,
      isLoading: true,
    }),
    [stopPageLoading]: state => ({
      ...state,
      isLoading: false,
    }),
    [openSidebar]: state => ({
      ...state,
      isSidebarOpened: true,
    }),
    [closeSidebar]: state => ({
      ...state,
      isSidebarOpened: false,
    }),
  },
  initialState
)

export default app
