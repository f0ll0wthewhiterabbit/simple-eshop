import { all } from 'redux-saga/effects'

import {
  watchFetchProducts,
  watchFetchProduct,
  watchFetchProductRating,
  watchChangeProductRating,
  watchDeleteProductRating,
  watchAddProduct,
  watchEditProduct,
  watchDeleteProducts,
} from './products'
import {
  watchFetchUsers,
  watchDeleteUsers,
  watchRequestUserDeletion,
  watchUpdateUser,
} from './users'
import { watchAuthenticate, watchSignUp, watchSignIn, watchSignOut } from './auth'

export default function*() {
  yield all([
    watchFetchUsers(),
    watchDeleteUsers(),
    watchRequestUserDeletion(),
    watchUpdateUser(),
    watchFetchProducts(),
    watchFetchProduct(),
    watchFetchProductRating(),
    watchChangeProductRating(),
    watchDeleteProductRating(),
    watchAddProduct(),
    watchEditProduct(),
    watchDeleteProducts(),
    watchAuthenticate(),
    watchSignUp(),
    watchSignIn(),
    watchSignOut(),
  ])
}
