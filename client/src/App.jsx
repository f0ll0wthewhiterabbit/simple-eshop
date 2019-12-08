import React from 'react'
import { Provider } from 'react-redux'

import ThemeProviderWrapper from './components/wrappers/ThemeProvider'
import Router from './Router'
import getStore from './store'
import Root from './components/wrappers/Root'

const App = () => (
  <Provider store={getStore()}>
    <ThemeProviderWrapper>
      <Root>
        <Router />
      </Root>
    </ThemeProviderWrapper>
  </Provider>
)

export default App
