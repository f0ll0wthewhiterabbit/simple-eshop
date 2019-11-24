import { all } from 'redux-saga/effects'

import watchFetchProducts from './products'
import { watchFetchUsers, watchAddUser, watchSignInUser } from './users'
import watchFetchDatabaseToStorage from './storage'
import { watchDeleteItems, watchInitialize } from './app'

export default function*() {
  yield all([
    watchFetchProducts(),
    watchFetchDatabaseToStorage(),
    watchFetchUsers(),
    watchDeleteItems(),
    watchAddUser(),
    watchSignInUser(),
    watchInitialize(),
  ])
}
