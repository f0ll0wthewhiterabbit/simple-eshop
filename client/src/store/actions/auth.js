import {
  AUTHENTICATE,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_ERROR,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
} from '../../constants'

export const authenticate = () => ({
  type: AUTHENTICATE,
})

export const authenticateSuccess = userData => ({
  type: AUTHENTICATE_SUCCESS,
  payload: { userData },
})

export const authenticateError = error => ({
  type: AUTHENTICATE_ERROR,
  payload: { error },
})

export const signUp = userData => ({
  type: SIGN_UP,
  payload: { userData },
})

export const signUpSuccess = token => ({
  type: SIGN_UP_SUCCESS,
  payload: { token },
})

export const signUpError = error => ({
  type: SIGN_UP_ERROR,
  payload: { error },
})

export const signIn = userData => ({
  type: SIGN_IN,
  payload: { userData },
})

export const signInSuccess = token => ({
  type: SIGN_IN_SUCCESS,
  payload: { token },
})

export const signInError = error => ({
  type: SIGN_IN_ERROR,
  payload: { error },
})

export const signOut = (history, location) => ({
  type: SIGN_OUT,
  payload: { history, location },
})

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
})
