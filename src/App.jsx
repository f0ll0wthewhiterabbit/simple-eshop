import React from 'react'

import ThemeProviderWrapper from './components/wrappers/ThemeProvider'
import StandardLayout from './components/layouts/Standard'

function App() {
  return (
    <ThemeProviderWrapper>
      <StandardLayout>Main content should be here...</StandardLayout>
    </ThemeProviderWrapper>
  )
}

export default App
