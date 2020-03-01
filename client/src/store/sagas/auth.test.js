import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'

import API from '../../utils/api'
import setAuthToken from '../../utils/setAuthToken'
import isTokenExpired from '../../utils/isTokenExpired'
import {
  authenticateRequest,
  authenticateError,
  authenticateSuccess,
  setProductsPerPage,
  signUpSuccess,
  signUpError,
  signInSuccess,
  signInError,
  signOutSuccess,
} from '../actions'
import {
  handleAuthenticateRequest,
  handleSignUpRequest,
  handleSignInRequest,
  handleSignOutRequest,
} from './auth'
import { ROLES, PAGE_LIMITS, PAGE_PATHS, FIELDS } from '../../constants'

jest.mock('../../utils/convertToRecord', () => jest.fn(() => ({ id: 1 })))

describe('Auth sagas', () => {
  describe('authenticateRequest', () => {
    const testResponse = {
      data: {
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'jd@email.com',
        role: ROLES.ADMIN,
        isRemovable: false,
      },
    }
    const userData = { id: 1 }

    it('should handle if token not expired', () => {
      return expectSaga(handleAuthenticateRequest)
        .provide([
          [matchers.call.fn(localStorage.getItem), 'testToken'],
          [matchers.call.fn(isTokenExpired), false],
          [matchers.call.fn(setAuthToken), undefined],
          [matchers.call.fn(API.get), testResponse],
          [matchers.call.fn(localStorage.removeItem), undefined],
        ])
        .call([localStorage, 'getItem'], FIELDS.STORAGE_ACCESS_TOKEN)
        .put(setProductsPerPage(PAGE_LIMITS.ADMIN_DEFAULT))
        .put(authenticateSuccess(userData))
        .run()
    })

    it('should handle if token expired', () => {
      const testResponseTokens = {
        data: {
          accessToken: 'testAccessToken',
          refreshToken: 'testRefreshToken',
        },
      }
      return expectSaga(handleAuthenticateRequest)
        .provide([
          [matchers.call.fn(localStorage.getItem), 'testToken'],
          [matchers.call.fn(isTokenExpired), true],
          [matchers.call.fn(setAuthToken), undefined],
          [matchers.call.fn(API.get), testResponse],
          [matchers.call.fn(API.post), testResponseTokens],
          [matchers.call.fn(localStorage.removeItem), undefined],
          [matchers.call.fn(localStorage.setItem), undefined],
        ])
        .call([localStorage, 'getItem'], FIELDS.STORAGE_ACCESS_TOKEN)
        .put(setProductsPerPage(PAGE_LIMITS.ADMIN_DEFAULT))
        .put(authenticateSuccess(userData))
        .run()
    })

    it('should handle error without token', () => {
      return expectSaga(handleAuthenticateRequest)
        .provide([
          [matchers.call.fn(setAuthToken), undefined],
          [matchers.call.fn(API.get), testResponse],
          [matchers.call.fn(localStorage.getItem), null],
          [matchers.call.fn(localStorage.removeItem), undefined],
        ])
        .call([localStorage, 'getItem'], FIELDS.STORAGE_ACCESS_TOKEN)
        .put(authenticateError(''))
        .run()
    })

    it('should handle error case', () => {
      const error = { response: { data: {} } }
      const errorMessage = 'Authentication failed!'

      return expectSaga(handleAuthenticateRequest)
        .provide([
          [matchers.call.fn(isTokenExpired), false],
          [matchers.call.fn(setAuthToken), undefined],
          [matchers.call.fn(API.get), throwError(error)],
          [matchers.call.fn(localStorage.getItem), 'testToken'],
          [matchers.call.fn(localStorage.removeItem), undefined],
        ])
        .call([localStorage, 'getItem'], FIELDS.STORAGE_ACCESS_TOKEN)
        .put(authenticateError(errorMessage))
        .call([localStorage, 'removeItem'], FIELDS.STORAGE_ACCESS_TOKEN)
        .run()
    })
  })

  describe('signUpRequest', () => {
    const action = {
      payload: {
        userData: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'jd@email.com',
          password: 'qwerty',
        },
        setFormSubmitting: jest.fn(),
      },
    }

    beforeEach(() => {
      action.payload.setFormSubmitting.mockClear()
    })

    it('should handle', () => {
      const testResponse = {
        data: {
          accessToken: '123456qwe',
        },
      }

      return expectSaga(handleSignUpRequest, action)
        .provide([
          [matchers.call.fn(API.post), testResponse],
          [matchers.call.fn(localStorage.setItem), undefined],
          [matchers.call.fn(localStorage.removeItem), undefined],
        ])
        .call([localStorage, 'setItem'], FIELDS.STORAGE_ACCESS_TOKEN, testResponse.data.accessToken)
        .put(signUpSuccess(testResponse.data.accessToken))
        .put(authenticateRequest())
        .run()
    })

    it('should handle error case', () => {
      const error = { response: { data: {} } }
      const errorMessage = 'Registration failed! Something went wrong.'

      expectSaga(handleSignUpRequest, action)
        .provide([
          [matchers.call.fn(API.post), throwError(error)],
          [matchers.call.fn(localStorage.setItem), undefined],
          [matchers.call.fn(localStorage.removeItem), undefined],
        ])
        .call([localStorage, 'removeItem'], FIELDS.STORAGE_ACCESS_TOKEN)
        .put(signUpError(errorMessage))
        .run()

      expect(action.payload.setFormSubmitting).toHaveBeenCalledTimes(1)
      expect(action.payload.setFormSubmitting).toHaveBeenLastCalledWith(false)
    })
  })

  describe('signInRequest', () => {
    const action = {
      payload: {
        userData: {
          email: 'jd@email.com',
          password: 'qwerty',
          rememberMe: false,
        },
        setFormSubmitting: jest.fn(),
      },
    }

    beforeEach(() => {
      action.payload.setFormSubmitting.mockClear()
    })

    it('should handle', () => {
      const testResponse = {
        data: {
          accessToken: '123456qwe',
        },
      }

      return expectSaga(handleSignInRequest, action)
        .provide([
          [matchers.call.fn(API.post), testResponse],
          [matchers.call.fn(localStorage.setItem), undefined],
          [matchers.call.fn(localStorage.removeItem), undefined],
        ])
        .call([localStorage, 'setItem'], FIELDS.STORAGE_ACCESS_TOKEN, testResponse.data.accessToken)
        .put(signInSuccess(testResponse.data.accessToken))
        .put(authenticateRequest())
        .run()
    })

    it('should handle error case', () => {
      const error = { response: { data: {} } }
      const errorMessage = 'Unable to login! Something went wrong!'

      expectSaga(handleSignInRequest, action)
        .provide([
          [matchers.call.fn(API.post), throwError(error)],
          [matchers.call.fn(localStorage.setItem), undefined],
          [matchers.call.fn(localStorage.removeItem), undefined],
        ])
        .call([localStorage, 'removeItem'], FIELDS.STORAGE_ACCESS_TOKEN)
        .put(signInError(errorMessage))
        .run()

      expect(action.payload.setFormSubmitting).toHaveBeenCalledTimes(1)
      expect(action.payload.setFormSubmitting).toHaveBeenLastCalledWith(false)
    })
  })

  describe('signOutRequest', () => {
    const action = {
      payload: {
        history: {
          push: jest.fn(),
        },
        location: {
          pathname: PAGE_PATHS.ADMIN_PRODUCTS,
        },
        setFormSubmitting: jest.fn(),
      },
    }

    beforeEach(() => {
      action.payload.history.push.mockClear()
    })

    it('should handle', () => {
      expectSaga(handleSignOutRequest, action)
        .provide([
          [matchers.call.fn(localStorage.getItem), 'testToken'],
          [matchers.call.fn(localStorage.removeItem, FIELDS.STORAGE_REFRESH_TOKEN), undefined],
          [matchers.call.fn(localStorage.removeItem, FIELDS.STORAGE_ACCESS_TOKEN), undefined],
          [matchers.call.fn(API.delete), undefined],
        ])
        .call([localStorage, 'removeItem'], FIELDS.STORAGE_REFRESH_TOKEN)
        .call([localStorage, 'removeItem'], FIELDS.STORAGE_ACCESS_TOKEN)
        .put(signOutSuccess())
        .run()

      expect(action.payload.history.push).toHaveBeenCalledTimes(1)
      expect(action.payload.history.push).toHaveBeenLastCalledWith(PAGE_PATHS.SIGN_IN)
    })
  })
})
