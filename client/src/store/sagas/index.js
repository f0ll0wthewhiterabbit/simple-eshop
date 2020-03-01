import { all } from 'redux-saga/effects'

import {
  watchFetchProductsRequest,
  watchFetchProductRequest,
  watchFetchProductRatingRequest,
  watchChangeProductRatingRequest,
  watchDeleteProductRatingRequest,
  watchAddProductRequest,
  watchEditProductRequest,
  watchDeleteProductsRequest,
} from './products'
import {
  watchFetchUsersRequest,
  watchDeleteUsersRequest,
  watchCallForUserDeletionRequest,
  watchUpdateUserRequest,
} from './users'
import {
  watchAuthenticateRequest,
  watchSignUpRequest,
  watchSignInRequest,
  watchSignOutRequest,
} from './auth'
import {
  watchToggleThemeRequest,
  watchGetThemeFromStorageRequest,
  watchInitializeRequest,
} from './app'

export default function*() {
  yield all([
    watchFetchUsersRequest(),
    watchDeleteUsersRequest(),
    watchCallForUserDeletionRequest(),
    watchUpdateUserRequest(),
    watchFetchProductsRequest(),
    watchFetchProductRequest(),
    watchFetchProductRatingRequest(),
    watchChangeProductRatingRequest(),
    watchDeleteProductRatingRequest(),
    watchAddProductRequest(),
    watchEditProductRequest(),
    watchDeleteProductsRequest(),
    watchAuthenticateRequest(),
    watchSignUpRequest(),
    watchSignInRequest(),
    watchSignOutRequest(),
    watchToggleThemeRequest(),
    watchGetThemeFromStorageRequest(),
    watchInitializeRequest(),
  ])
}
