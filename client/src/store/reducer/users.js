import { handleActions, combineActions } from 'redux-actions'
import { Record, List } from 'immutable'

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

const users = handleActions(
  {
    [startUsersLoading]: state => state.set('isLoading', true),

    [fetchUsersSuccess]: (state, action) =>
      state
        .set('data', action.payload.usersList)
        .set('totalAmount', action.payload.totalAmount)
        .set('itemsPerPage', action.payload.itemsPerPage)
        .set('currentPage', action.payload.currentPage)
        .set('totalPages', action.payload.totalPages)
        .set('isLoading', false)
        .delete('error'),

    [deleteUsersSuccess]: (state, action) =>
      state
        .update('data', data =>
          data.filter(user => action.payload.deletedUsers.findIndex(it => it === user._id) === -1)
        )
        .update('totalAmount', amount => amount - action.payload.deletedUsers.size)
        .set('isLoading', false)
        .delete('error'),

    [callForUserDeletionSuccess]: (state, action) =>
      state
        .update('data', data =>
          data.map(user =>
            user.get('_id') === action.payload.userId ? user.set('isRemovable', true) : user
          )
        )
        .set('isLoading', false)
        .delete('error'),

    [updateUserSuccess]: (state, action) =>
      state
        .update('data', data =>
          data.map(user =>
            user.get('_id') === action.payload.user._id ? action.payload.user : user
          )
        )
        .set('isLoading', false)
        .delete('error'),

    [combineActions(
      fetchUsersError,
      deleteUsersError,
      callForUserDeletionError,
      updateUserError
    )]: (state, action) => state.set('isLoading', false).set('error', action.payload.error),

    [setSelectedUsers]: (state, action) => state.set('selected', action.payload.selectedUsersList),

    [setUsersPerPage]: (state, action) => state.set('itemsPerPage', action.payload.amount),

    [setUsersSearchQuery]: (state, action) =>
      state.set('lastSearchQuery', action.payload.searchQuery),
  },
  initialState
)

export default users
