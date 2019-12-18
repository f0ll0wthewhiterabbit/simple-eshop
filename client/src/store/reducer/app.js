import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

import {
  showModal,
  closeModal,
  startPageLoading,
  stopPageLoading,
  openSidebar,
  closeSidebar,
} from '../actions'

const initialState = fromJS({
  isLoading: false,
  modal: {
    isOpened: false,
    storeFieldName: '',
  },
  isSidebarOpened: false,
})

const app = handleActions(
  {
    [showModal]: (state, action) =>
      state.mergeDeep({
        modal: {
          isOpened: true,
          storeFieldName: action.payload.storeFieldNameForModal,
        },
      }),
    [closeModal]: state =>
      state.mergeDeep({
        modal: {
          isOpened: false,
          storeFieldName: '',
        },
      }),
    [startPageLoading]: state => state.set('isLoading', true),
    [stopPageLoading]: state => state.set('isLoading', false),
    [openSidebar]: state => state.set('isSidebarOpened', true),
    [closeSidebar]: state => state.set('isSidebarOpened', false),
  },
  initialState
)

export default app
