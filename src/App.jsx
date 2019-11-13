import React from 'react'

import ThemeProviderWrapper from './components/wrappers/ThemeProvider'
import Router from './Router'

function App() {
  return (
    <ThemeProviderWrapper>
      <Router />
    </ThemeProviderWrapper>
  )
}

export default App
