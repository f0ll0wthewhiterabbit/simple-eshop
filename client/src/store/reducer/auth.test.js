import { Record } from 'immutable'

import authReducer from './auth'
import {
  authenticateSuccess,
  authenticateError,
  signUpSuccess,
  signUpError,
  signInSuccess,
  signInError,
  signOutSuccess,
} from '../actions'
import { ROLES } from '../../constants'

describe('Auth reducer', () => {
  const initialState = Record({
    isAuthenticated: false,
    token: null,
    user: Record({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      role: ROLES.GUEST,
      isRemovable: false,
    })(),
    error: null,
  })()
  const testUserData = {
    id: '1',
    firstName: 'testName',
    lastName: 'testLastName',
    email: 'test@email.com',
    role: ROLES.USER,
    isRemovable: false,
  }
  const testError = 'test error message'

  it('should return the initial state', () => {
    const recievedState = authReducer(undefined, {})

    expect(recievedState.hashCode()).toBe(initialState.hashCode())
  })

  it('should handle [authenticateSuccess] action', () => {
    const expectedUser = Record({
      id: testUserData.id,
      firstName: testUserData.firstName,
      lastName: testUserData.lastName,
      email: testUserData.email,
      role: testUserData.role,
      isRemovable: testUserData.isRemovable,
    })()
    const recievedState = authReducer(undefined, authenticateSuccess(testUserData))

    expect(recievedState.isAuthenticated).toBe(true)
    expect(recievedState.error).toBe(null)
    expect(recievedState.user.hashCode()).toBe(expectedUser.hashCode())
  })

  it('should handle [signUpSuccess] action', () => {
    const testToken = 123
    const recievedState = authReducer(undefined, signUpSuccess(testToken))

    expect(recievedState.isAuthenticated).toBe(true)
    expect(recievedState.error).toBe(null)
    expect(recievedState.token).toBe(testToken)
  })

  it('should handle [signInSuccess] action', () => {
    const testToken = 123
    const recievedState = authReducer(undefined, signInSuccess(testToken))

    expect(recievedState.isAuthenticated).toBe(true)
    expect(recievedState.error).toBe(null)
    expect(recievedState.token).toBe(testToken)
  })

  it('should handle [authenticateError] action', () => {
    const recievedState = authReducer(undefined, authenticateError(testError))

    expect(recievedState.error).toBe(testError)
    expect(recievedState.isAuthenticated).toBe(initialState.isAuthenticated)
    expect(recievedState.token).toBe(initialState.token)
    expect(recievedState.user.hashCode()).toBe(initialState.user.hashCode())
  })

  it('should handle [signUpError] action', () => {
    const recievedState = authReducer(undefined, signUpError(testError))

    expect(recievedState.error).toBe(testError)
    expect(recievedState.isAuthenticated).toBe(initialState.isAuthenticated)
    expect(recievedState.token).toBe(initialState.token)
    expect(recievedState.user.hashCode()).toBe(initialState.user.hashCode())
  })

  it('should handle [signInError] action', () => {
    const recievedState = authReducer(undefined, signInError(testError))

    expect(recievedState.error).toBe(testError)
    expect(recievedState.isAuthenticated).toBe(initialState.isAuthenticated)
    expect(recievedState.token).toBe(initialState.token)
    expect(recievedState.user.hashCode()).toBe(initialState.user.hashCode())
  })

  it('should change error to empty string after [signOutSuccess] action', () => {
    const recievedState = authReducer(undefined, signOutSuccess())

    expect(recievedState.error).toBe('')
  })

  it('should delete auth data after [signOutSuccess] action', () => {
    const stateAfterSignIn = authReducer(undefined, signInSuccess(123))
    const stateAfterAuthenticate = authReducer(stateAfterSignIn, authenticateSuccess(testUserData))
    const recievedState = authReducer(stateAfterAuthenticate, signOutSuccess())

    expect(recievedState.isAuthenticated).toBe(initialState.isAuthenticated)
    expect(recievedState.token).toBe(initialState.token)
    expect(recievedState.user.hashCode()).toBe(initialState.user.hashCode())
  })
})
