import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import { select } from 'redux-saga/effects'

import API from '../../utils/api'
import {
  fetchUsersSuccess,
  fetchUsersError,
  startUsersLoading,
  closeModal,
  deleteUsersSuccess,
  deleteUsersError,
  callForUserDeletionSuccess,
  authenticateRequest,
  authenticateSuccess,
  callForUserDeletionError,
  updateUserSuccess,
  updateUserError,
} from '../actions'
import {
  getUsers,
  getRole,
  handleFetchUsersRequest,
  handleDeleteUsersRequest,
  handleCallForUserDeletionRequest,
  handleUpdateUserRequest,
} from './users'
import { ROLES } from '../../constants'

jest.mock('../../utils/convertToRecord', () => jest.fn(() => [1, 2, 3]))

describe('Users sagas', () => {
  describe('fetchUsersRequest', () => {
    const action = { payload: { currentPage: 1, itemsPerPage: 10 } }

    it('should handle', () => {
      const testResponse = {
        data: {
          page: 1,
          perPage: 10,
          total: 7,
          totalPages: 1,
          data: [1, 2, 3],
        },
      }
      const {
        total: totalAmount,
        page: currentPage,
        perPage: itemsPerPage,
        totalPages,
      } = testResponse.data
      const usersList = testResponse.data.data

      return expectSaga(handleFetchUsersRequest, action)
        .provide([[matchers.call.fn(API.get), testResponse]])
        .put(startUsersLoading())
        .put(fetchUsersSuccess(usersList, totalAmount, currentPage, itemsPerPage, totalPages))
        .run()
    })

    it('should handle error case', () => {
      const error = new Error('error')
      const errorMessage = 'Users data not received!'

      return expectSaga(handleFetchUsersRequest, action)
        .provide([[matchers.call.fn(API.get), throwError(error)]])
        .put(startUsersLoading())
        .put(fetchUsersError(errorMessage))
        .run()
    })
  })

  describe('deleteUsersRequest', () => {
    const deletedUsers = ['1', '2']

    it('should handle', () => {
      return expectSaga(handleDeleteUsersRequest)
        .provide([
          [matchers.call.fn(API.delete), () => jest.fn()],
          [select(getUsers), deletedUsers],
        ])
        .put(closeModal())
        .put(startUsersLoading())
        .put(deleteUsersSuccess(deletedUsers))
        .select(getUsers)
        .run()
    })

    it('should handle error case', () => {
      const error = new Error('error')
      const errorMessage = 'Users delete error!'

      return expectSaga(handleDeleteUsersRequest)
        .provide([
          [matchers.call.fn(API.delete), throwError(error)],
          [select(getUsers), deletedUsers],
        ])
        .put(closeModal())
        .put(startUsersLoading())
        .select(getUsers)
        .put(deleteUsersError(errorMessage))
        .run()
    })
  })

  describe('callForUserDeletionRequest', () => {
    it('should handle', () => {
      const testResponse = {
        data: {
          _id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'jd@email.com',
          role: ROLES.USER,
          isRemovable: false,
        },
      }
      const { _id: id, firstName, lastName, email, role, isRemovable } = testResponse.data
      const userData = { id, firstName, lastName, email, role, isRemovable }

      return expectSaga(handleCallForUserDeletionRequest)
        .provide([[matchers.call.fn(API.patch), testResponse]])
        .put(closeModal())
        .put(startUsersLoading())
        .put(callForUserDeletionSuccess(id))
        .put(authenticateSuccess(userData))
        .run()
    })

    it('should handle error case', () => {
      const error = new Error('error')
      const errorMessage = 'Users delete error!'

      return expectSaga(handleCallForUserDeletionRequest)
        .provide([[matchers.call.fn(API.patch), throwError(error)]])
        .put(closeModal())
        .put(startUsersLoading())
        .put(callForUserDeletionError(errorMessage))
        .run()
    })
  })

  describe('updateUserRequest', () => {
    const action = {
      payload: {
        userData: {
          firstName: 'John',
          lastName: 'Doe',
        },
        history: {
          push: jest.fn(),
        },
        setFormSubmitting: jest.fn(),
      },
    }

    beforeEach(() => {
      action.payload.history.push.mockClear()
      action.payload.setFormSubmitting.mockClear()
    })

    it('should handle', () => {
      expectSaga(handleUpdateUserRequest, action)
        .provide([
          [matchers.call.fn(API.patch), [1, 2, 3]],
          [select(getRole), ROLES.USER],
        ])
        .put(startUsersLoading())
        .put(updateUserSuccess([1, 2, 3]))
        .put(authenticateRequest())
        .run()

      expect(action.payload.history.push).toHaveBeenCalledTimes(1)
    })

    it('should handle error case', () => {
      const error = new Error('error')
      const errorMessage = 'User update error!'

      expectSaga(handleUpdateUserRequest, action)
        .provide([[matchers.call.fn(API.patch), throwError(error)]])
        .put(startUsersLoading())
        .put(updateUserError(errorMessage))
        .run()

      expect(action.payload.setFormSubmitting).toHaveBeenCalledTimes(1)
      expect(action.payload.setFormSubmitting).toHaveBeenLastCalledWith(false)
    })
  })
})
