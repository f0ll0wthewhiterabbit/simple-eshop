import { createAction } from 'redux-actions'

export const authenticateRequest = createAction('AUTH/AUTHENTICATE_REQUEST')
export const authenticateSuccess = createAction('AUTH/AUTHENTICATE_SUCCESS', userData => ({
  userData,
}))
export const authenticateError = createAction('AUTH/AUTHENTICATE_ERROR', error => ({ error }))

export const signUpRequest = createAction(
  'AUTH/SIGN_UP_REQUEST',
  (userData, setFormSubmitting) => ({
    userData,
    setFormSubmitting,
  })
)
export const signUpSuccess = createAction('AUTH/SIGN_UP_SUCCESS', token => ({ token }))
export const signUpError = createAction('AUTH/SIGN_UP_ERROR', error => ({ error }))

export const signInRequest = createAction(
  'AUTH/SIGN_IN_REQUEST',
  (userData, setFormSubmitting) => ({
    userData,
    setFormSubmitting,
  })
)
export const signInSuccess = createAction('AUTH/SIGN_IN_SUCCESS', token => ({ token }))
export const signInError = createAction('AUTH/SIGN_IN_ERROR', error => ({ error }))

export const signOutRequest = createAction('AUTH/SIGN_OUT_REQUEST', (history, location) => ({
  history,
  location,
}))
export const signOutSuccess = createAction('AUTH/SIGN_OUT_SUCCESS')
