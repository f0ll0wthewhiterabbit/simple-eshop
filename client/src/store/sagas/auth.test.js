import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'

import API from '../../utils/api'
import setAuthToken from '../../utils/setAuthToken'
import isTokenExpired from '../../utils/isTokenExpired'
import {
  authenticateError,
  authenticateSuccess,
  setProductsPerPage,
  signUpSuccess,
  authenticate,
  signUpError,
  signInSuccess,
  signInError,
  signOutSuccess,
} from '../actions'
import { handleAuthenticate, handleSignUp, handleSignIn, handleSignOut } from './auth'
import {
  ROLE_ADMIN,
  DEFAULT_ADMIN_PER_PAGE_LIMIT,
  ADMIN_PRODUCTS_PAGE_PATH,
  SIGN_IN_PAGE_PATH,
  STORAGE_FIELD_ACCESS_TOKEN,
  STORAGE_FIELD_REFRESH_TOKEN,
} from '../../constants'

describe('Auth sagas', () => {
  describe('authenticate', () => {
    const testResponse = {
      data: {
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'jd@email.com',
        role: ROLE_ADMIN,
        isRemovable: false,
      },
    }
    const { _id: id, firstName, lastName, email, role, isRemovable } = testResponse.data
    const userData = { id, firstName, lastName, email, role, isRemovable }

    it('should handle if token not expired', () => {
      return expectSaga(handleAuthenticate)
        .provide([
          [matchers.call.fn(localStorage.getItem), 'testToken'],
          [matchers.call.fn(isTokenExpired), false],
          [matchers.call.fn(setAuthToken), undefined],
          [matchers.call.fn(API.get), testResponse],
          [matchers.call.fn(localStorage.removeItem), undefined],
        ])
        .call([localStorage, 'getItem'], STORAGE_FIELD_ACCESS_TOKEN)
        .put(setProductsPerPage(DEFAULT_ADMIN_PER_PAGE_LIMIT))
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
      return expectSaga(handleAuthenticate)
        .provide([
          [matchers.call.fn(localStorage.getItem), 'testToken'],
          [matchers.call.fn(isTokenExpired), true],
          [matchers.call.fn(setAuthToken), undefined],
          [matchers.call.fn(API.get), testResponse],
          [matchers.call.fn(API.post), testResponseTokens],
          [matchers.call.fn(localStorage.removeItem), undefined],
          [matchers.call.fn(localStorage.setItem), undefined],
        ])
        .call([localStorage, 'getItem'], STORAGE_FIELD_ACCESS_TOKEN)
        .put(setProductsPerPage(DEFAULT_ADMIN_PER_PAGE_LIMIT))
        .put(authenticateSuccess(userData))
        .run()
    })

    it('should handle error without token', () => {
      return expectSaga(handleAuthenticate)
        .provide([
          [matchers.call.fn(setAuthToken), undefined],
          [matchers.call.fn(API.get), testResponse],
          [matchers.call.fn(localStorage.getItem), null],
          [matchers.call.fn(localStorage.removeItem), undefined],
        ])
        .call([localStorage, 'getItem'], STORAGE_FIELD_ACCESS_TOKEN)
        .put(authenticateError(''))
        .run()
    })

    it('should handle error case', () => {
      const error = { response: { data: {} } }
      const errorMessage = 'Authentication failed!'

      return expectSaga(handleAuthenticate)
        .provide([
          [matchers.call.fn(isTokenExpired), false],
          [matchers.call.fn(setAuthToken), undefined],
          [matchers.call.fn(API.get), throwError(error)],
          [matchers.call.fn(localStorage.getItem), 'testToken'],
          [matchers.call.fn(localStorage.removeItem), undefined],
        ])
        .call([localStorage, 'getItem'], STORAGE_FIELD_ACCESS_TOKEN)
        .put(authenticateError(errorMessage))
        .call([localStorage, 'removeItem'], STORAGE_FIELD_ACCESS_TOKEN)
        .run()
    })
  })

  describe('signUp', () => {
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

      return expectSaga(handleSignUp, action)
        .provide([
          [matchers.call.fn(API.post), testResponse],
          [matchers.call.fn(localStorage.setItem), undefined],
          [matchers.call.fn(localStorage.removeItem), undefined],
        ])
        .call([localStorage, 'setItem'], STORAGE_FIELD_ACCESS_TOKEN, testResponse.data.accessToken)
        .put(signUpSuccess(testResponse.data.accessToken))
        .put(authenticate())
        .run()
    })

    it('should handle error case', () => {
      const error = { response: { data: {} } }
      const errorMessage = 'Registration failed! Something went wrong.'

      expectSaga(handleSignUp, action)
        .provide([
          [matchers.call.fn(API.post), throwError(error)],
          [matchers.call.fn(localStorage.setItem), undefined],
          [matchers.call.fn(localStorage.removeItem), undefined],
        ])
        .call([localStorage, 'removeItem'], STORAGE_FIELD_ACCESS_TOKEN)
        .put(signUpError(errorMessage))
        .run()

      expect(action.payload.setFormSubmitting).toHaveBeenCalledTimes(1)
      expect(action.payload.setFormSubmitting).toHaveBeenLastCalledWith(false)
    })
  })

  describe('signIn', () => {
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

      return expectSaga(handleSignIn, action)
        .provide([
          [matchers.call.fn(API.post), testResponse],
          [matchers.call.fn(localStorage.setItem), undefined],
          [matchers.call.fn(localStorage.removeItem), undefined],
        ])
        .call([localStorage, 'setItem'], STORAGE_FIELD_ACCESS_TOKEN, testResponse.data.accessToken)
        .put(signInSuccess(testResponse.data.accessToken))
        .put(authenticate())
        .run()
    })

    it('should handle error case', () => {
      const error = { response: { data: {} } }
      const errorMessage = 'Unable to login! Something went wrong!'

      expectSaga(handleSignIn, action)
        .provide([
          [matchers.call.fn(API.post), throwError(error)],
          [matchers.call.fn(localStorage.setItem), undefined],
          [matchers.call.fn(localStorage.removeItem), undefined],
        ])
        .call([localStorage, 'removeItem'], STORAGE_FIELD_ACCESS_TOKEN)
        .put(signInError(errorMessage))
        .run()

      expect(action.payload.setFormSubmitting).toHaveBeenCalledTimes(1)
      expect(action.payload.setFormSubmitting).toHaveBeenLastCalledWith(false)
    })
  })

  describe('signOut', () => {
    const action = {
      payload: {
        history: {
          push: jest.fn(),
        },
        location: {
          pathname: ADMIN_PRODUCTS_PAGE_PATH,
        },
        setFormSubmitting: jest.fn(),
      },
    }

    beforeEach(() => {
      action.payload.history.push.mockClear()
    })

    it('should handle', () => {
      expectSaga(handleSignOut, action)
        .provide([
          [matchers.call.fn(localStorage.getItem), 'testToken'],
          [matchers.call.fn(localStorage.removeItem, STORAGE_FIELD_REFRESH_TOKEN), undefined],
          [matchers.call.fn(localStorage.removeItem, STORAGE_FIELD_ACCESS_TOKEN), undefined],
          [matchers.call.fn(API.delete), undefined],
        ])
        .call([localStorage, 'removeItem'], STORAGE_FIELD_REFRESH_TOKEN)
        .call([localStorage, 'removeItem'], STORAGE_FIELD_ACCESS_TOKEN)
        .put(signOutSuccess())
        .run()

      expect(action.payload.history.push).toHaveBeenCalledTimes(1)
      expect(action.payload.history.push).toHaveBeenLastCalledWith(SIGN_IN_PAGE_PATH)
    })
  })
})
