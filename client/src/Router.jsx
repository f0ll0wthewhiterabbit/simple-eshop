import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Layout from './components/wrappers/Layout'
import Loader from './components/global/Loader'
import PrivateRoute from './components/wrappers/PrivateRoute'

import { PAGE_PATHS } from './constants'

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
            <PrivateRoute exact path={PAGE_PATHS.HOME} component={HomePage} />
            <PrivateRoute exact path={PAGE_PATHS.CATALOG} component={CatalogPage} />
            <PrivateRoute exact path={PAGE_PATHS.ABOUT} component={AboutPage} />
            <PrivateRoute exact path={PAGE_PATHS.BLOG} component={BlogPage} />
            <PrivateRoute exact path={PAGE_PATHS.CONTACT} component={ContactPage} />
            <PrivateRoute exact path={PAGE_PATHS.PROFILE} component={ProfilePage} />
            <Route exact path={PAGE_PATHS.SIGN_IN} component={SignInPage} />
            <Route exact path={PAGE_PATHS.SIGN_UP} component={SignUpPage} />
            <PrivateRoute exact path={PAGE_PATHS.ADMIN_USERS} component={AdminUsersPage} />
            <Route
              path={PAGE_PATHS.ADMIN_PRODUCTS}
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
            <Redirect from={PAGE_PATHS.ADMIN} to={PAGE_PATHS.ADMIN_PRODUCTS} />
            <Route exact path={PAGE_PATHS.ERROR} render={props => <ErrorPage {...props} />} />
            <Redirect to={PAGE_PATHS.ERROR} />
          </Switch>
        </React.Suspense>
      </Layout>
    </Router>
  )
}
