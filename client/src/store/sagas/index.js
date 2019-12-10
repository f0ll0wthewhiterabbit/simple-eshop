import { all } from 'redux-saga/effects'

import {
  watchFetchProducts,
  watchChangeProductRating,
  watchDeleteProductRating,
  watchAddProduct,
  watchDeleteProducts,
} from './products'
import { watchFetchUsers, watchDeleteUsers, watchRequestUserDeletion } from './users'
import { watchAuthenticate, watchSignUp, watchSignIn, watchSignOut } from './auth'

export default function*() {
  yield all([
    watchFetchUsers(),
    watchDeleteUsers(),
    watchRequestUserDeletion(),
    watchFetchProducts(),
    watchChangeProductRating(),
    watchDeleteProductRating(),
    watchAddProduct(),
    watchDeleteProducts(),
    watchAuthenticate(),
    watchSignUp(),
    watchSignIn(),
    watchSignOut(),
  ])
}
