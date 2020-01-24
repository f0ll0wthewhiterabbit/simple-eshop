import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Layout from './components/wrappers/Layout'
import Loader from './components/global/Loader'
import PrivateRoute from './components/wrappers/PrivateRoute'

import {
  MAIN_PAGE_PATH,
  PROFILE_PAGE_PATH,
  SIGN_IN_PAGE_PATH,
  SIGN_UP_PAGE_PATH,
  ADMIN_PAGE_PATH,
  ADMIN_USERS_PAGE_PATH,
  ADMIN_PRODUCTS_PAGE_PATH,
  ADMIN_PRODUCT_ADD_PAGE_PATH,
  ERROR_PAGE_PATH,
} from './constants'

const CatalogPage = React.lazy(() => import('./pages/Catalog'))
const ProfilePage = React.lazy(() => import('./pages/Profile'))
const SignInPage = React.lazy(() => import('./pages/SignIn'))
const SignUpPage = React.lazy(() => import('./pages/SignUp'))
const AdminUsersPage = React.lazy(() => import('./pages/admin/Users'))
const AdminProductsPage = React.lazy(() => import('./pages/admin/Products'))
const AdminProductAddPage = React.lazy(() => import('./pages/admin/ProductAdd'))
const AdminProductEditPage = React.lazy(() => import('./pages/admin/ProductEdit'))
const AdminProductRatingPage = React.lazy(() => import('./pages/admin/ProductRating'))
const ErrorPage = React.lazy(() => import('./pages/Error'))

export default () => {
  return (
    <Router>
      <Layout>
        <React.Suspense fallback={<Loader />}>
          <Switch>
            <PrivateRoute exact path={MAIN_PAGE_PATH} component={CatalogPage} />
            <PrivateRoute exact path={PROFILE_PAGE_PATH} component={ProfilePage} />
            <Route exact path={SIGN_IN_PAGE_PATH} component={SignInPage} />
            <Route exact path={SIGN_UP_PAGE_PATH} component={SignUpPage} />
            <PrivateRoute exact path={ADMIN_USERS_PAGE_PATH} component={AdminUsersPage} />
            <PrivateRoute exact path={ADMIN_PRODUCTS_PAGE_PATH} component={AdminProductsPage} />
            <PrivateRoute
              exact
              path={ADMIN_PRODUCT_ADD_PAGE_PATH}
              component={AdminProductAddPage}
            />
            <PrivateRoute
              exact
              path={`${ADMIN_PRODUCTS_PAGE_PATH}/:id`}
              component={AdminProductEditPage}
            />
            <PrivateRoute
              exact
              path={`${ADMIN_PRODUCTS_PAGE_PATH}/:id/rating`}
              component={AdminProductRatingPage}
            />
            <PrivateRoute
              exact
              path={ADMIN_PAGE_PATH}
              component={<Redirect to={ADMIN_PRODUCTS_PAGE_PATH} />}
            />
            <Route exact path={ERROR_PAGE_PATH} render={props => <ErrorPage {...props} />} />
            <Redirect to={ERROR_PAGE_PATH} />
          </Switch>
        </React.Suspense>
      </Layout>
    </Router>
  )
}
