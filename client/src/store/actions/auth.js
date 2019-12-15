import { createActions } from 'redux-actions'

const { auth } = createActions({
  AUTH: {
    AUTHENTICATE: undefined,
    AUTHENTICATE_SUCCESS: userData => ({ userData }),
    AUTHENTICATE_ERROR: error => ({ error }),
    SIGN_UP: userData => ({ userData }),
    SIGN_UP_SUCCESS: token => ({ token }),
    SIGN_UP_ERROR: error => ({ error }),
    SIGN_IN: userData => ({ userData }),
    SIGN_IN_SUCCESS: token => ({ token }),
    SIGN_IN_ERROR: error => ({ error }),
    SIGN_OUT: (history, location) => ({ history, location }),
    SIGN_OUT_SUCCESS: undefined,
  },
})

export const {
  authenticate,
  authenticateSuccess,
  authenticateError,
  signUp,
  signUpSuccess,
  signUpError,
  signIn,
  signInSuccess,
  signInError,
  signOut,
  signOutSuccess,
} = auth
