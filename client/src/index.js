import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { StylesProvider } from '@material-ui/core/styles'
import 'typeface-roboto'

import getStore from './store'
import AppContainer from './components/wrappers/App'

ReactDOM.render(
  <StylesProvider injectFirst>
    <Provider store={getStore()}>
      <AppContainer />
    </Provider>
  </StylesProvider>,
  document.getElementById('root')
)
