import { Record, List } from 'immutable'

import usersReducer from './users'
import {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersError,
  setSelectedUsers,
  deleteUsers,
  deleteUsersSuccess,
  deleteUsersError,
  requestUserDeletion,
  requestUserDeletionSuccess,
  requestUserDeletionError,
  updateUser,
  updateUserSuccess,
  updateUserError,
  setUsersPerPage,
} from '../actions'
import { DEFAULT_ADMIN_PER_PAGE_LIMIT } from '../../constants'

describe('Users reducer', () => {
  const initialState = Record({
    data: List(),
    totalAmount: 0,
    itemsPerPage: DEFAULT_ADMIN_PER_PAGE_LIMIT,
    currentPage: 1,
    totalPages: 1,
    selected: List(),
    isLoading: false,
    error: null,
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
    const recievedState = usersReducer(undefined, {})

    expect(recievedState.hashCode()).toBe(initialState.hashCode())
  })

  it('should start loading after [fetchUsers] action', () => {
    const recievedState = usersReducer(undefined, fetchUsers())

    expect(recievedState.isLoading).toBe(true)
  })

  it('should start loading after [deleteUsers] action', () => {
    const recievedState = usersReducer(undefined, deleteUsers())

    expect(recievedState.isLoading).toBe(true)
  })

  it('should start loading after [requestUserDeletion] action', () => {
    const recievedState = usersReducer(undefined, requestUserDeletion())

    expect(recievedState.isLoading).toBe(true)
  })

  it('should start loading after [updateUser] action', () => {
    const recievedState = usersReducer(undefined, updateUser())

    expect(recievedState.isLoading).toBe(true)
  })

  it('should handle [fetchUsersSuccess] action', () => {
    const recievedState = usersReducer(
      undefined,
      fetchUsersSuccess(
        testUsersList,
        testTotalAmount,
        testCurrentPage,
        testItemsPerPage,
        testTotalPages
      )
    )

    expect(recievedState.data).toEqual(testUsersList)
    expect(recievedState.totalAmount).toBe(testTotalAmount)
    expect(recievedState.currentPage).toBe(testCurrentPage)
    expect(recievedState.itemsPerPage).toBe(testItemsPerPage)
    expect(recievedState.totalPages).toBe(testTotalPages)
    expect(recievedState.isLoading).toBe(initialState.isLoading)
    expect(recievedState.error).toBe(initialState.error)
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
    const recievedState = usersReducer(stateAfterFetchUsers, deleteUsersSuccess(deleteUserIdsList))
    const expectedUsersList = List([testUser2])

    expect(recievedState.data).toEqual(expectedUsersList)
    expect(recievedState.totalAmount).toEqual(testTotalAmount - deleteUserIdsList.size)
    expect(recievedState.isLoading).toEqual(initialState.isLoading)
    expect(recievedState.error).toEqual(initialState.error)
  })

  it('should handle [requestUserDeletionSuccess] action', () => {
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
    const recievedState = usersReducer(stateAfterFetchUsers, requestUserDeletionSuccess('2'))

    expect(recievedState.isLoading).toEqual(initialState.isLoading)
    expect(recievedState.error).toEqual(initialState.error)
    expect(recievedState.data.get(1).isRemovable).toBe(expectedUser.isRemovable)
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
    const recievedState = usersReducer(stateAfterFetchUsers, updateUserSuccess(expectedUser))

    expect(recievedState.isLoading).toEqual(initialState.isLoading)
    expect(recievedState.error).toEqual(initialState.error)
    expect(recievedState.data.get(1).firstName).toBe(expectedUser.firstName)
  })

  it('should handle [fetchUsersError] action', () => {
    const recievedState = usersReducer(undefined, fetchUsersError(testError))

    expect(recievedState.error).toEqual(testError)
    expect(recievedState.isLoading).toEqual(initialState.isLoading)
  })

  it('should handle [deleteUsersError] action', () => {
    const recievedState = usersReducer(undefined, deleteUsersError(testError))

    expect(recievedState.error).toEqual(testError)
    expect(recievedState.isLoading).toEqual(initialState.isLoading)
  })

  it('should handle [requestUserDeletionError] action', () => {
    const recievedState = usersReducer(undefined, requestUserDeletionError(testError))

    expect(recievedState.error).toEqual(testError)
    expect(recievedState.isLoading).toEqual(initialState.isLoading)
  })

  it('should handle [updateUserError] action', () => {
    const recievedState = usersReducer(undefined, updateUserError(testError))

    expect(recievedState.error).toEqual(testError)
    expect(recievedState.isLoading).toEqual(initialState.isLoading)
  })

  it('should handle [setSelectedUsers] action', () => {
    const selectetUsersIds = ['1', '2']
    const recievedState = usersReducer(undefined, setSelectedUsers(selectetUsersIds))

    expect(recievedState.selected).toEqual(selectetUsersIds)
  })

  it('should handle [setUsersPerPage] action', () => {
    const amount = 5
    const recievedState = usersReducer(undefined, setUsersPerPage(amount))

    expect(recievedState.itemsPerPage).toBe(amount)
  })
})