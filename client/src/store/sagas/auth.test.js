import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'

import API from '../../utils/api'
import setAuthToken from '../../utils/setAuthToken'
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
  ROLE_USER,
  ROLE_ADMIN,
  DEFAULT_ADMIN_PER_PAGE_LIMIT,
  STORAGE_FIELD_TOKEN,
  ADMIN_PRODUCTS_PAGE_PATH,
  SIGN_IN_PAGE_PATH,
} from '../../constants'

describe('Auth sagas', () => {
  describe('authenticate', () => {
    it('should handle', () => {
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

      return expectSaga(handleAuthenticate)
        .provide([
          [matchers.call.fn(localStorage.getItem), 'testToken'],
          [matchers.call.fn(setAuthToken), undefined],
          [matchers.call.fn(API.get), testResponse],
          [matchers.call.fn(localStorage.removeItem), undefined],
        ])
        .call([localStorage, 'getItem'], STORAGE_FIELD_TOKEN)
        .put(setProductsPerPage(DEFAULT_ADMIN_PER_PAGE_LIMIT))
        .put(authenticateSuccess(userData))
        .run()
    })

    it('should handle error without token', () => {
      const testResponse = {
        data: {
          _id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'jd@email.com',
          role: ROLE_USER,
          isRemovable: false,
        },
      }

      return expectSaga(handleAuthenticate)
        .provide([
          [matchers.call.fn(setAuthToken), undefined],
          [matchers.call.fn(API.get), testResponse],
          [matchers.call.fn(localStorage.getItem), null],
          [matchers.call.fn(localStorage.removeItem), undefined],
        ])
        .call([localStorage, 'getItem'], STORAGE_FIELD_TOKEN)
        .put(authenticateError(''))
        .run()
    })

    it('should handle error case', () => {
      const error = { response: { data: {} } }
      const errorMessage = 'Authentication failed!'

      return expectSaga(handleAuthenticate)
        .provide([
          [matchers.call.fn(setAuthToken), undefined],
          [matchers.call.fn(API.get), throwError(error)],
          [matchers.call.fn(localStorage.getItem), 'testToken'],
          [matchers.call.fn(localStorage.removeItem), undefined],
        ])
        .call([localStorage, 'getItem'], STORAGE_FIELD_TOKEN)
        .put(authenticateError(errorMessage))
        .call([localStorage, 'removeItem'], STORAGE_FIELD_TOKEN)
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
          token: '123456qwe',
        },
      }

      return expectSaga(handleSignUp, action)
        .provide([
          [matchers.call.fn(API.post), testResponse],
          [matchers.call.fn(localStorage.setItem), undefined],
          [matchers.call.fn(localStorage.removeItem), undefined],
        ])
        .call([localStorage, 'setItem'], STORAGE_FIELD_TOKEN, testResponse.data.token)
        .put(signUpSuccess(testResponse.data.token))
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
        .call([localStorage, 'removeItem'], STORAGE_FIELD_TOKEN)
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
          token: '123456qwe',
        },
      }

      return expectSaga(handleSignIn, action)
        .provide([
          [matchers.call.fn(API.post), testResponse],
          [matchers.call.fn(localStorage.setItem), undefined],
          [matchers.call.fn(localStorage.removeItem), undefined],
        ])
        .call([localStorage, 'setItem'], STORAGE_FIELD_TOKEN, testResponse.data.token)
        .put(signInSuccess(testResponse.data.token))
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
        .call([localStorage, 'removeItem'], STORAGE_FIELD_TOKEN)
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
        .provide([[matchers.call.fn(localStorage.removeItem), undefined]])
        .call([localStorage, 'removeItem'], STORAGE_FIELD_TOKEN)
        .put(signOutSuccess())
        .run()

      expect(action.payload.history.push).toHaveBeenCalledTimes(1)
      expect(action.payload.history.push).toHaveBeenLastCalledWith(SIGN_IN_PAGE_PATH)
    })
  })
})
