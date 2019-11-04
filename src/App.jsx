import React from 'react'

import ThemeProviderWrapper from './components/wrappers/ThemeProvider'
import StandardLayout from './components/layouts/Standard'
import CatalogPage from './components/pages/Catalog'

function App() {
  return (
    <ThemeProviderWrapper>
      <StandardLayout>
        <CatalogPage />
      </StandardLayout>
    </ThemeProviderWrapper>
  )
}

export default App
