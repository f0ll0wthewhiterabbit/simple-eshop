import { Record, List } from 'immutable'

import usersReducer from './users'
import {
  fetchUsersSuccess,
  fetchUsersError,
  setSelectedUsers,
  deleteUsersSuccess,
  deleteUsersError,
  callForUserDeletionSuccess,
  callForUserDeletionError,
  updateUserSuccess,
  updateUserError,
  setUsersPerPage,
  startUsersLoading,
  setUsersSearchQuery,
} from '../actions'
import { PAGE_LIMITS } from '../../constants'

describe('Users reducer', () => {
  const initialState = Record({
    data: List(),
    totalAmount: 0,
    itemsPerPage: PAGE_LIMITS.ADMIN_DEFAULT,
    currentPage: 1,
    totalPages: 1,
    selected: List(),
    lastSearchQuery: '',
    isLoading: true,
    error: '',
  })()
  const testUser1 = Record({ _id: '1', isRemovable: false, firstName: 'First' })()
  const testUser2 = Record({ _id: '2', isRemovable: false, firstName: 'Second' })()
  const testUser3 = Record({ _id: '3', isRemovable: false, firstName: 'Third' })()
  const testUsersList = List([testUser1, testUser2, testUser3])
  const testTotalAmount = 3
  const testCurrentPage = 1
  const testItemsPerPage = 2
  const testTotalPages = 2
  const testError = 'test error message'

  it('should return the initial state', () => {
    const receivedState = usersReducer(undefined, {})

    expect(receivedState.hashCode()).toBe(initialState.hashCode())
  })

  it('should start loading after [startUsersLoading] action', () => {
    const receivedState = usersReducer(undefined, startUsersLoading())

    expect(receivedState.isLoading).toBe(true)
  })

  it('should handle [fetchUsersSuccess] action', () => {
    const receivedState = usersReducer(
      undefined,
      fetchUsersSuccess(
        testUsersList,
        testTotalAmount,
        testCurrentPage,
        testItemsPerPage,
        testTotalPages
      )
    )

    expect(receivedState.data).toEqual(testUsersList)
    expect(receivedState.totalAmount).toBe(testTotalAmount)
    expect(receivedState.currentPage).toBe(testCurrentPage)
    expect(receivedState.itemsPerPage).toBe(testItemsPerPage)
    expect(receivedState.totalPages).toBe(testTotalPages)
    expect(receivedState.isLoading).toBe(false)
    expect(receivedState.error).toBe(initialState.error)
  })

  it('should handle [deleteUsersSuccess] action', () => {
    const deleteUserIdsList = List(['1', '3'])
    const stateAfterFetchUsers = usersReducer(
      undefined,
      fetchUsersSuccess(
        testUsersList,
        testTotalAmount,
        testCurrentPage,
        testItemsPerPage,
        testTotalPages
      )
    )
    const receivedState = usersReducer(stateAfterFetchUsers, deleteUsersSuccess(deleteUserIdsList))
    const expectedUsersList = List([testUser2])

    expect(receivedState.data).toEqual(expectedUsersList)
    expect(receivedState.totalAmount).toEqual(testTotalAmount - deleteUserIdsList.size)
    expect(receivedState.isLoading).toEqual(false)
    expect(receivedState.error).toEqual(initialState.error)
  })

  it('should handle [callForUserDeletionSuccess] action', () => {
    const expectedUser = Record({ _id: '2', isRemovable: true, firstName: 'Second' })()
    const stateAfterFetchUsers = usersReducer(
      undefined,
      fetchUsersSuccess(
        testUsersList,
        testTotalAmount,
        testCurrentPage,
        testItemsPerPage,
        testTotalPages
      )
    )
    const receivedState = usersReducer(stateAfterFetchUsers, callForUserDeletionSuccess('2'))

    expect(receivedState.isLoading).toEqual(false)
    expect(receivedState.error).toEqual(initialState.error)
    expect(receivedState.data.get(1).isRemovable).toBe(expectedUser.isRemovable)
  })

  it('should handle [updateUserSuccess] action', () => {
    const expectedUser = Record({ _id: '2', isRemovable: false, firstName: 'UpdatedSecond' })()
    const stateAfterFetchUsers = usersReducer(
      undefined,
      fetchUsersSuccess(
        testUsersList,
        testTotalAmount,
        testCurrentPage,
        testItemsPerPage,
        testTotalPages
      )
    )
    const receivedState = usersReducer(stateAfterFetchUsers, updateUserSuccess(expectedUser))

    expect(receivedState.isLoading).toEqual(false)
    expect(receivedState.error).toEqual(initialState.error)
    expect(receivedState.data.get(1).firstName).toBe(expectedUser.firstName)
  })

  it('should handle [fetchUsersError] action', () => {
    const receivedState = usersReducer(undefined, fetchUsersError(testError))

    expect(receivedState.error).toEqual(testError)
    expect(receivedState.isLoading).toEqual(false)
  })

  it('should handle [deleteUsersError] action', () => {
    const receivedState = usersReducer(undefined, deleteUsersError(testError))

    expect(receivedState.error).toEqual(testError)
    expect(receivedState.isLoading).toEqual(false)
  })

  it('should handle [callForUserDeletionError] action', () => {
    const receivedState = usersReducer(undefined, callForUserDeletionError(testError))

    expect(receivedState.error).toEqual(testError)
    expect(receivedState.isLoading).toEqual(false)
  })

  it('should handle [updateUserError] action', () => {
    const receivedState = usersReducer(undefined, updateUserError(testError))

    expect(receivedState.error).toEqual(testError)
    expect(receivedState.isLoading).toEqual(false)
  })

  it('should handle [setSelectedUsers] action', () => {
    const selectedUsersIds = ['1', '2']
    const receivedState = usersReducer(undefined, setSelectedUsers(selectedUsersIds))

    expect(receivedState.selected).toEqual(selectedUsersIds)
  })

  it('should handle [setUsersPerPage] action', () => {
    const amount = 5
    const receivedState = usersReducer(undefined, setUsersPerPage(amount))

    expect(receivedState.itemsPerPage).toBe(amount)
  })

  it('should handle [setUsersSearchQuery] action', () => {
    const testQuery = 'test'
    const receivedState = usersReducer(undefined, setUsersSearchQuery(testQuery))

    expect(receivedState.lastSearchQuery).toBe(testQuery)
  })
})
