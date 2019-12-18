import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

import { showModal, closeModal, openSidebar, closeSidebar } from '../actions'

const initialState = fromJS({
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
    [openSidebar]: state => state.set('isSidebarOpened', true),
    [closeSidebar]: state => state.set('isSidebarOpened', false),
  },
  initialState
)

export default app
