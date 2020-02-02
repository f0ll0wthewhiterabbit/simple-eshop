import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { action } from '@storybook/addon-actions'
import { Map } from 'immutable'

import StandardLayout from './component'

// A super-simple mock of a redux store
const store = {
  getState: () => {
    return Map()
  },
  subscribe: () => 0,
  dispatch: action('dispatch'),
}

export default {
  title: 'Layouts/StandardLayout',
  component: StandardLayout,
  excludeStories: /.*Data$/,
  decorators: [
    story => (
      <Provider store={store}>
        <Router>{story()}</Router>
      </Provider>
    ),
  ],
}

export const standardLayoutData = {
  requestUserDeletion: () => {},
}

export const normal = () => (
  <StandardLayout {...standardLayoutData}>
    <h1>Test content</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  </StandardLayout>
)
