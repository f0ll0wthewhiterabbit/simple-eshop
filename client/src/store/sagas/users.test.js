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
  requestUserDeletionSuccess,
  authenticateSuccess,
  requestUserDeletionError,
  updateUserSuccess,
  authenticate,
  updateUserError,
} from '../actions'
import {
  getUsers,
  getRole,
  handleFetchUsers,
  handleDeleteUsers,
  handleRequestUserDeletion,
  handleUpdateUser,
} from './users'
import { ROLE_USER } from '../../constants'

jest.mock('../../utils/convertToRecord', () => jest.fn(() => [1, 2, 3]))

describe('Users sagas', () => {
  describe('fetchUsers', () => {
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

      return expectSaga(handleFetchUsers, action)
        .provide([[matchers.call.fn(API.get), testResponse]])
        .put(startUsersLoading())
        .put(fetchUsersSuccess(usersList, totalAmount, currentPage, itemsPerPage, totalPages))
        .run()
    })

    it('should handle error case', () => {
      const error = new Error('error')
      const errorMessage = 'Users data not recieved!'

      return expectSaga(handleFetchUsers, action)
        .provide([[matchers.call.fn(API.get), throwError(error)]])
        .put(startUsersLoading())
        .put(fetchUsersError(errorMessage))
        .run()
    })
  })

  describe('deleteUsers', () => {
    const deletedUsers = ['1', '2']

    it('should handle', () => {
      return expectSaga(handleDeleteUsers)
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

      return expectSaga(handleDeleteUsers)
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

  describe('requestUserDeletion', () => {
    it('should handle', () => {
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
      const { _id: id, firstName, lastName, email, role, isRemovable } = testResponse.data
      const userData = { id, firstName, lastName, email, role, isRemovable }

      return expectSaga(handleRequestUserDeletion)
        .provide([[matchers.call.fn(API.patch), testResponse]])
        .put(closeModal())
        .put(startUsersLoading())
        .put(requestUserDeletionSuccess(id))
        .put(authenticateSuccess(userData))
        .run()
    })

    it('should handle error case', () => {
      const error = new Error('error')
      const errorMessage = 'Users delete error!'

      return expectSaga(handleRequestUserDeletion)
        .provide([[matchers.call.fn(API.patch), throwError(error)]])
        .put(closeModal())
        .put(startUsersLoading())
        .put(requestUserDeletionError(errorMessage))
        .run()
    })
  })

  describe('updateUser', () => {
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
      expectSaga(handleUpdateUser, action)
        .provide([
          [matchers.call.fn(API.patch), [1, 2, 3]],
          [select(getRole), ROLE_USER],
        ])
        .put(startUsersLoading())
        .put(updateUserSuccess([1, 2, 3]))
        .put(authenticate())
        .run()

      expect(action.payload.history.push).toHaveBeenCalledTimes(1)
    })

    it('should handle error case', () => {
      const error = new Error('error')
      const errorMessage = 'User update error!'

      expectSaga(handleUpdateUser, action)
        .provide([[matchers.call.fn(API.patch), throwError(error)]])
        .put(startUsersLoading())
        .put(updateUserError(errorMessage))
        .run()

      expect(action.payload.setFormSubmitting).toHaveBeenCalledTimes(1)
      expect(action.payload.setFormSubmitting).toHaveBeenLastCalledWith(false)
    })
  })
})