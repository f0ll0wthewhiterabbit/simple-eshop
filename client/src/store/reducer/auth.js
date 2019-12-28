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
import { ROLE_GUEST } from '../../constants'

const UserRecord = Record({
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  role: ROLE_GUEST,
  isRemovable: false,
})
const AuthRecord = Record({
  isAuthenticated: false,
  token: null,
  user: new UserRecord(),
  error: null,
})
const initialState = new AuthRecord()

const auth = handleActions(
  {
    [authenticateSuccess]: (state, action) =>
      state
        .mergeDeep({
          isAuthenticated: true,
          user: action.payload.userData,
        })
        .delete('error'),

    [combineActions(signUpSuccess, signInSuccess)]: (state, action) =>
      state
        .merge({
          isAuthenticated: true,
          token: action.payload.token,
        })
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
