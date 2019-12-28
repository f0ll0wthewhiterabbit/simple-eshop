import { handleActions } from 'redux-actions'
import { Record } from 'immutable'

import { showModal, closeModal, openSidebar, closeSidebar } from '../actions'

const AppRecord = Record({
  isModalOpened: false,
  storeFieldNameForModal: '',
  isSidebarOpened: false,
})
const initialState = new AppRecord()

const app = handleActions(
  {
    [showModal]: (state, action) =>
      state.merge({
        isModalOpened: true,
        storeFieldNameForModal: action.payload.storeFieldNameForModal,
      }),

    [closeModal]: state => state.delete('isModalOpened').delete('storeFieldNameForModal'),

    [openSidebar]: state => state.set('isSidebarOpened', true),

    [closeSidebar]: state => state.delete('isSidebarOpened'),
  },
  initialState
)

export default app
