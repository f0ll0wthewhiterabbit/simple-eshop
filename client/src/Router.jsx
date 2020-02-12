import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Layout from './components/wrappers/Layout'
import Loader from './components/global/Loader'
import PrivateRoute from './components/wrappers/PrivateRoute'

import {
  HOME_PAGE_PATH,
  CATALOG_PAGE_PATH,
  ABOUT_PAGE_PATH,
  BLOG_PAGE_PATH,
  CONTACT_PAGE_PATH,
  PROFILE_PAGE_PATH,
  SIGN_IN_PAGE_PATH,
  SIGN_UP_PAGE_PATH,
  ADMIN_PAGE_PATH,
  ADMIN_USERS_PAGE_PATH,
  ADMIN_PRODUCTS_PAGE_PATH,
  ERROR_PAGE_PATH,
} from './constants'

const HomePage = React.lazy(() => import('./pages/Home'))
const CatalogPage = React.lazy(() => import('./pages/Catalog'))
const AboutPage = React.lazy(() => import('./pages/About'))
const BlogPage = React.lazy(() => import('./pages/Blog'))
const ContactPage = React.lazy(() => import('./pages/Contact'))
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
            <PrivateRoute exact path={HOME_PAGE_PATH} component={HomePage} />
            <PrivateRoute exact path={CATALOG_PAGE_PATH} component={CatalogPage} />
            <PrivateRoute exact path={ABOUT_PAGE_PATH} component={AboutPage} />
            <PrivateRoute exact path={BLOG_PAGE_PATH} component={BlogPage} />
            <PrivateRoute exact path={CONTACT_PAGE_PATH} component={ContactPage} />
            <PrivateRoute exact path={PROFILE_PAGE_PATH} component={ProfilePage} />
            <Route exact path={SIGN_IN_PAGE_PATH} component={SignInPage} />
            <Route exact path={SIGN_UP_PAGE_PATH} component={SignUpPage} />
            <PrivateRoute exact path={ADMIN_USERS_PAGE_PATH} component={AdminUsersPage} />
            <Route
              path={ADMIN_PRODUCTS_PAGE_PATH}
              render={({ match: { url } }) => (
                <Switch>
                  <PrivateRoute path={`${url}/`} component={AdminProductsPage} exact />
                  <PrivateRoute path={`${url}/add`} component={AdminProductAddPage} exact />
                  <PrivateRoute path={`${url}/:id`} component={AdminProductEditPage} exact />
                  <PrivateRoute
                    path={`${url}/:id/rating`}
                    component={AdminProductRatingPage}
                    exact
                  />
                </Switch>
              )}
            />
            <Redirect from={ADMIN_PAGE_PATH} to={ADMIN_PRODUCTS_PAGE_PATH} />
            <Route exact path={ERROR_PAGE_PATH} render={props => <ErrorPage {...props} />} />
            <Redirect to={ERROR_PAGE_PATH} />
          </Switch>
        </React.Suspense>
      </Layout>
    </Router>
  )
}
