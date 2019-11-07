import React from 'react'
import ReactDOM from 'react-dom'
import { StylesProvider } from '@material-ui/core/styles'
import 'typeface-roboto'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <StylesProvider injectFirst>
    <App />
  </StylesProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()