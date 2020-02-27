import { createAction } from 'redux-actions'

export const authenticate = createAction('AUTH/AUTHENTICATE')
export const authenticateSuccess = createAction('AUTH/AUTHENTICATE_SUCCESS', userData => ({
  userData,
}))
export const authenticateError = createAction('AUTH/AUTHENTICATE_ERROR', error => ({ error }))
export const signUp = createAction('AUTH/SIGN_UP', (userData, setFormSubmitting) => ({
  userData,
  setFormSubmitting,
}))
export const signUpSuccess = createAction('AUTH/SIGN_UP_SUCCESS', token => ({ token }))
export const signUpError = createAction('AUTH/SIGN_UP_ERROR', error => ({ error }))
export const signIn = createAction('AUTH/SIGN_IN', (userData, setFormSubmitting) => ({
  userData,
  setFormSubmitting,
}))
export const signInSuccess = createAction('AUTH/SIGN_IN_SUCCESS', token => ({ token }))
export const signInError = createAction('AUTH/SIGN_IN_ERROR', error => ({ error }))
export const signOut = createAction('AUTH/SIGN_OUT', (history, location) => ({
  history,
  location,
}))
export const signOutSuccess = createAction('AUTH/SIGN_OUT_SUCCESS')
