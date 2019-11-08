import React from 'react'

import ThemeProviderWrapper from './components/wrappers/ThemeProvider'
// import StandardLayout from './components/layouts/Standard'
// import CatalogPage from './components/pages/Catalog'
import AdminLayout from './components/layouts/Admin'
// import UsersPage from './components/pages/admin/Users'
import ProductsPage from './components/pages/admin/Products'

function App() {
  return (
    <ThemeProviderWrapper>
      {/* <StandardLayout>
        <CatalogPage />
      </StandardLayout> */}

      {/* <AdminLayout>
        <UsersPage />
      </AdminLayout> */}

      <AdminLayout>
        <ProductsPage />
      </AdminLayout>
    </ThemeProviderWrapper>
  )
}

export default App
