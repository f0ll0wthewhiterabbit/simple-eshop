import { combineReducers } from 'redux'

import users from './users'
import products from './products'
import app from './app'

export default combineReducers({
  users,
  products,
  app,
})
