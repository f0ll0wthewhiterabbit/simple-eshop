import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { StylesProvider } from '@material-ui/core/styles'
import 'typeface-roboto'

import getStore from './store'
import App from './components/wrappers/App'

ReactDOM.render(
  <StylesProvider injectFirst>
    <Provider store={getStore()}>
      <App />
    </Provider>
  </StylesProvider>,
  document.getElementById('root')
)
