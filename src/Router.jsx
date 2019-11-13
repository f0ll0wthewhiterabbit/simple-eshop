import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import StandardLayout from './components/layouts/Standard'
import Loader from './components/global/Loader'

import {
  MAIN_PAGE_PATH,
  SING_IN_PAGE_PATH,
  SING_UP_PAGE_PATH,
  ADMIN_PAGE_PATH,
  ADMIN_USERS_PAGE_PATH,
  ADMIN_PRODUCTS_PAGE_PATH,
  ADMIN_PRODUCT_ADD_PAGE_PATH,
  ERROR_PAGE_PATH,
} from './constants'

const AdminLayout = React.lazy(() => import('./components/layouts/Admin'))
const CatalogPage = React.lazy(() => import('./components/pages/Catalog'))
const SignInPage = React.lazy(() => import('./components/pages/SignIn'))
const SignUpPage = React.lazy(() => import('./components/pages/SignUp'))
const AdminUsersPage = React.lazy(() => import('./components/pages/admin/Users'))
const AdminProductsPage = React.lazy(() => import('./components/pages/admin/Products'))
const AdminProductAddPage = React.lazy(() => import('./components/pages/admin/ProductAdd'))
const ErrorPage = React.lazy(() => import('./components/pages/Error'))

export default () => (
  <Router>
    <React.Suspense
      fallback={
        <StandardLayout>
          <Loader />
        </StandardLayout>
      }
    >
      <Switch>
        <Route exact path={MAIN_PAGE_PATH}>
          <StandardLayout>
            <CatalogPage />
          </StandardLayout>
        </Route>

        <Route exact path={SING_IN_PAGE_PATH}>
          <StandardLayout>
            <SignInPage />
          </StandardLayout>
        </Route>

        <Route exact path={SING_UP_PAGE_PATH}>
          <StandardLayout>
            <SignUpPage />
          </StandardLayout>
        </Route>

        <Route exact path={ADMIN_PAGE_PATH}>
          <Redirect to={ADMIN_USERS_PAGE_PATH} />
        </Route>

        <Route exact path={ADMIN_USERS_PAGE_PATH}>
          <AdminLayout>
            <AdminUsersPage />
          </AdminLayout>
        </Route>

        <Route exact path={ADMIN_PRODUCTS_PAGE_PATH}>
          <AdminLayout>
            <AdminProductsPage />
          </AdminLayout>
        </Route>

        <Route exact path={ADMIN_PRODUCT_ADD_PAGE_PATH}>
          <AdminLayout>
            <AdminProductAddPage />
          </AdminLayout>
        </Route>

        <Route exact path={ERROR_PAGE_PATH}>
          <StandardLayout>
            <ErrorPage />
          </StandardLayout>
        </Route>

        <Route>
          <StandardLayout>
            <ErrorPage />
          </StandardLayout>
        </Route>
      </Switch>
    </React.Suspense>
  </Router>
)

// TODO: move layouts to the upper scope?
