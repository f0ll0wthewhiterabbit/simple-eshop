import React from 'react'
import { Provider } from 'react-redux'

import ThemeProviderWrapper from './components/wrappers/ThemeProvider'
import Router from './Router'
import getStore from './store'

function App() {
  return (
    <Provider store={getStore()}>
      <ThemeProviderWrapper>
        <Router />
      </ThemeProviderWrapper>
    </Provider>
  )
}

export default App
