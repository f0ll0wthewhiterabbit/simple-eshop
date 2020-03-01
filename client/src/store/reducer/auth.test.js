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
import { UserRecord } from './shared'

describe('Auth reducer', () => {
  const initialState = Record({
    isAuthenticated: false,
    token: null,
    user: new UserRecord(),
    error: '',
  })()
  const testUserData = new UserRecord({
    id: '1',
    firstName: 'testName',
    lastName: 'testLastName',
    email: 'test@email.com',
    role: ROLES.USER,
    isRemovable: false,
  })
  const testError = 'test error message'

  it('should return the initial state', () => {
    const receivedState = authReducer(undefined, {})

    expect(receivedState.hashCode()).toBe(initialState.hashCode())
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
    const receivedState = authReducer(undefined, authenticateSuccess(testUserData))

    expect(receivedState.isAuthenticated).toBe(true)
    expect(receivedState.error).toBe('')
    expect(receivedState.user.hashCode()).toBe(expectedUser.hashCode())
  })

  it('should handle [signUpSuccess] action', () => {
    const testToken = 123
    const receivedState = authReducer(undefined, signUpSuccess(testToken))

    expect(receivedState.isAuthenticated).toBe(true)
    expect(receivedState.error).toBe('')
    expect(receivedState.token).toBe(testToken)
  })

  it('should handle [signInSuccess] action', () => {
    const testToken = 123
    const receivedState = authReducer(undefined, signInSuccess(testToken))

    expect(receivedState.isAuthenticated).toBe(true)
    expect(receivedState.error).toBe('')
    expect(receivedState.token).toBe(testToken)
  })

  it('should handle [authenticateError] action', () => {
    const receivedState = authReducer(undefined, authenticateError(testError))

    expect(receivedState.error).toBe(testError)
    expect(receivedState.isAuthenticated).toBe(initialState.isAuthenticated)
    expect(receivedState.token).toBe(initialState.token)
    expect(receivedState.user.hashCode()).toBe(initialState.user.hashCode())
  })

  it('should handle [signUpError] action', () => {
    const receivedState = authReducer(undefined, signUpError(testError))

    expect(receivedState.error).toBe(testError)
    expect(receivedState.isAuthenticated).toBe(initialState.isAuthenticated)
    expect(receivedState.token).toBe(initialState.token)
    expect(receivedState.user.hashCode()).toBe(initialState.user.hashCode())
  })

  it('should handle [signInError] action', () => {
    const receivedState = authReducer(undefined, signInError(testError))

    expect(receivedState.error).toBe(testError)
    expect(receivedState.isAuthenticated).toBe(initialState.isAuthenticated)
    expect(receivedState.token).toBe(initialState.token)
    expect(receivedState.user.hashCode()).toBe(initialState.user.hashCode())
  })

  it('should change error to empty string after [signOutSuccess] action', () => {
    const receivedState = authReducer(undefined, signOutSuccess())

    expect(receivedState.error).toBe('')
  })

  it('should delete auth data after [signOutSuccess] action', () => {
    const stateAfterSignIn = authReducer(undefined, signInSuccess(123))
    const stateAfterAuthenticate = authReducer(stateAfterSignIn, authenticateSuccess(testUserData))
    const receivedState = authReducer(stateAfterAuthenticate, signOutSuccess())

    expect(receivedState.isAuthenticated).toBe(initialState.isAuthenticated)
    expect(receivedState.token).toBe(initialState.token)
    expect(receivedState.user.hashCode()).toBe(initialState.user.hashCode())
  })
})
