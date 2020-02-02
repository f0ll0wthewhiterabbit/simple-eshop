import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { action } from '@storybook/addon-actions'
import { Map, Record } from 'immutable'

import AdminLayoutWithTheme from './component'
import { STORE_FIELD_USERS } from '../../../constants'

// A simple mock of a redux store
const store = {
  getState: () => {
    return Map({
      auth: Record({
        user: Record({
          firstName: 'John',
          lastName: 'Doe',
        })(),
      })(),
    })
  },
  subscribe: () => 0,
  dispatch: action('dispatch'),
}

export default {
  title: 'Layouts/AdminLayout',
  component: AdminLayoutWithTheme,
  excludeStories: /.*Data$/,
  decorators: [
    story => (
      <Provider store={store}>
        <Router>{story()}</Router>
      </Provider>
    ),
  ],
}

export const alertDialogData = {
  isSidebarOpened: false,
  storeFieldName: STORE_FIELD_USERS,
}

export const actionsData = {
  closeSidebar: action('closeSidebar'),
  deleteUsers: action('deleteUsers'),
  deleteProducts: action('deleteProducts'),
}

export const normal = () => (
  <AdminLayoutWithTheme {...alertDialogData}>
    <h1>Test content</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  </AdminLayoutWithTheme>
)
