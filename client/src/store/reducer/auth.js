import { handleActions, combineActions } from 'redux-actions'

import {
  authenticateSuccess,
  authenticateError,
  signUpSuccess,
  signUpError,
  signInSuccess,
  signInError,
  signOutSuccess,
} from '../actions'
import { DATABASE_FIELD_ROLE_GUEST } from '../../constants'

const initialState = {
  isAuthenticated: false,
  token: null,
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: DATABASE_FIELD_ROLE_GUEST,
    isRemovable: false,
  },
  error: null,
}

const auth = handleActions(
  {
    [authenticateSuccess]: (state, action) => ({
      ...state,
      isAuthenticated: true,
      user: {
        ...state.user,
        id: action.payload.userData.id,
        firstName: action.payload.userData.firstName,
        lastName: action.payload.userData.lastName,
        email: action.payload.userData.email,
        role: action.payload.userData.role,
        isRemovable: action.payload.userData.isRemovable,
      },
      error: null,
    }),
    [combineActions(signUpSuccess, signInSuccess)]: (state, action) => ({
      ...state,
      isAuthenticated: true,
      token: action.payload.token,
      error: null,
    }),
    [combineActions(authenticateError, signUpError, signInError)]: (state, action) => ({
      ...state,
      isAuthenticated: false,
      token: null,
      user: {
        ...state.user,
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        role: DATABASE_FIELD_ROLE_GUEST,
        isRemovable: false,
      },
      error: action.payload.error,
    }),
    [signOutSuccess]: state => ({
      ...state,
      isAuthenticated: false,
      token: null,
      user: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        role: DATABASE_FIELD_ROLE_GUEST,
        isRemovable: false,
      },
      error: '',
    }),
  },
  initialState
)

export default auth
