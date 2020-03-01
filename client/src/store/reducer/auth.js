import { handleActions, combineActions } from 'redux-actions'
import { Record } from 'immutable'

import {
  authenticateSuccess,
  authenticateError,
  signUpSuccess,
  signUpError,
  signInSuccess,
  signInError,
  signOutSuccess,
} from '../actions'
import { UserRecord } from './shared'

const initialState = Record({
  isAuthenticated: false,
  token: null,
  user: new UserRecord(),
  error: null,
})()

const auth = handleActions(
  {
    [authenticateSuccess]: (state, action) =>
      state
        .set('isAuthenticated', true)
        .set('user', action.payload.userData)
        .delete('error'),

    [combineActions(signUpSuccess, signInSuccess)]: (state, action) =>
      state
        .set('isAuthenticated', true)
        .set('token', action.payload.token)
        .delete('error'),

    [combineActions(authenticateError, signUpError, signInError)]: (state, action) =>
      state
        .delete('isAuthenticated')
        .delete('token')
        .delete('user')
        .set('error', action.payload.error),

    [signOutSuccess]: state =>
      state
        .delete('isAuthenticated')
        .delete('token')
        .delete('user')
        .set('error', ''),
  },
  initialState
)

export default auth
