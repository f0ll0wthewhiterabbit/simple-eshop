import React from 'react'

import ThemeProviderWrapper from './components/wrappers/ThemeProvider'
// import StandardLayout from './components/layouts/Standard'
// import CatalogPage from './components/pages/Catalog'
// import SignInPage from './components/pages/SignIn'
// import SignUpPage from './components/pages/SignUp'
import AdminLayout from './components/layouts/Admin'
// import UsersPage from './components/pages/admin/Users'
// import ProductsPage from './components/pages/admin/Products'
import ProductAddPage from './components/pages/admin/ProductAdd'

function App() {
  return (
    <ThemeProviderWrapper>
      {/* <StandardLayout>
        <CatalogPage />
        <SignInPage />
        <SignUpPage />
      </StandardLayout> */}

      <AdminLayout>
        {/* <UsersPage /> */}
        {/* <ProductsPage /> */}
        <ProductAddPage />
      </AdminLayout>
    </ThemeProviderWrapper>
  )
}

export default App
