import { handleActions } from 'redux-actions'
import { Record } from 'immutable'

import { showModal, closeModal, openSidebar, closeSidebar, toggleThemeRequest } from '../actions'
import { FIELDS } from '../../constants'

const initialState = Record({
  isModalOpened: false,
  storeFieldNameForModal: '',
  isSidebarOpened: false,
  theme: FIELDS.THEME_DEFAULT,
})()

const app = handleActions(
  {
    [showModal]: (state, action) =>
      state
        .set('isModalOpened', true)
        .set('storeFieldNameForModal', action.payload.storeFieldNameForModal),

    [closeModal]: state => state.delete('isModalOpened').delete('storeFieldNameForModal'),

    [openSidebar]: state => state.set('isSidebarOpened', true),

    [closeSidebar]: state => state.delete('isSidebarOpened'),

    [toggleThemeRequest]: (state, action) => state.set('theme', action.payload.theme),
  },
  initialState
)

export default app
