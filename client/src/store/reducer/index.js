import { combineReducers } from 'redux-immutable'

import users from './users'
import products from './products'
import app from './app'
import auth from './auth'

export default combineReducers({
  users,
  products,
  app,
  auth,
})
