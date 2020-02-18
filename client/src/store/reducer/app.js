import { handleActions } from 'redux-actions'
import { Record } from 'immutable'

import { showModal, closeModal, openSidebar, closeSidebar, toggleTheme } from '../actions'
import { FIELD_THEME_DEFAULT } from '../../constants'

const initialState = Record({
  isModalOpened: false,
  storeFieldNameForModal: '',
  isSidebarOpened: false,
  theme: FIELD_THEME_DEFAULT,
})()

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

    [toggleTheme]: (state, action) => state.set('theme', action.payload.theme),
  },
  initialState
)

export default app
