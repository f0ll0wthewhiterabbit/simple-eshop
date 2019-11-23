import { all } from 'redux-saga/effects'

import watchFetchProducts from './products'
import { watchFetchUsers, watchAddUser, watchSignInUser } from './users'
import { watchFetchDatabaseToStorage, watchDeleteUserDataFromStorage } from './storage'
import watchDeleteItems from './app'

export default function*() {
  yield all([
    watchFetchProducts(),
    watchFetchDatabaseToStorage(),
    watchFetchUsers(),
    watchDeleteItems(),
    watchAddUser(),
    watchSignInUser(),
    watchDeleteUserDataFromStorage(),
  ])
}
