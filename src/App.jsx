import React from 'react'

import ThemeProviderWrapper from './components/wrappers/ThemeProvider'
// import StandardLayout from './components/layouts/Standard'
// import CatalogPage from './components/pages/Catalog'
import AdminLayout from './components/layouts/Admin'

function App() {
  return (
    <ThemeProviderWrapper>
      {/* <StandardLayout>
        <CatalogPage />
      </StandardLayout> */}
      <AdminLayout>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae beatae, eveniet eaque
          ab unde illum, id, consectetur maxime eius a repudiandae voluptatibus natus nulla ipsam
          sit asperiores provident dignissimos quidem!
        </div>
      </AdminLayout>
    </ThemeProviderWrapper>
  )
}

export default App
