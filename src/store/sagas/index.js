import { all } from 'redux-saga/effects'

import watchFetchProducts from './products'
import { watchFetchUsers, watchAddUser } from './users'
import watchFetchDatabaseToStorage from './storage'
import watchDeleteItems from './app'

export default function*() {
  yield all([
    watchFetchProducts(),
    watchFetchDatabaseToStorage(),
    watchFetchUsers(),
    watchDeleteItems(),
    watchAddUser(),
  ])
}
