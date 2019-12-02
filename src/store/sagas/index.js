import { all } from 'redux-saga/effects'

import {
  watchFetchProducts,
  watchChangeProductRating,
  watchDeleteProductRating,
  watchAddProduct,
} from './products'
import { watchFetchUsers, watchSignUp, watchSignIn, watchSignOut } from './users'
import watchFetchDatabaseToStorage from './storage'
import { watchDeleteItems, watchInitialize } from './app'

export default function*() {
  yield all([
    watchFetchProducts(),
    watchFetchDatabaseToStorage(),
    watchFetchUsers(),
    watchDeleteItems(),
    watchSignUp(),
    watchSignIn(),
    watchInitialize(),
    watchSignOut(),
    watchChangeProductRating(),
    watchDeleteProductRating(),
    watchAddProduct(),
  ])
}
