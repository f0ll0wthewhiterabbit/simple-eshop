import { handleActions, combineActions } from 'redux-actions'
import { Record, List } from 'immutable'

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

const users = handleActions(
  {
    [combineActions(fetchUsers, deleteUsers, requestUserDeletion, updateUser)]: state =>
      state.set('isLoading', true),

    [fetchUsersSuccess]: (state, action) =>
      state
        .set('data', action.payload.usersList)
        .set('totalAmount', action.payload.totalAmount)
        .set('itemsPerPage', action.payload.itemsPerPage)
        .set('currentPage', action.payload.currentPage)
        .set('totalPages', action.payload.totalPages)
        .delete('isLoading')
        .delete('error'),

    [deleteUsersSuccess]: (state, action) =>
      state
        .update('data', data =>
          data.filter(user => action.payload.deletedUsers.findIndex(it => it === user._id) === -1)
        )
        .update('totalAmount', amount => amount - action.payload.deletedUsers.size)
        .delete('isLoading')
        .delete('error'),

    [requestUserDeletionSuccess]: (state, action) =>
      state
        .update('data', data =>
          data.map(user =>
            user.get('_id') === action.payload.userId ? user.set('isRemovable', true) : user
          )
        )
        .delete('isLoading')
        .delete('error'),

    [updateUserSuccess]: (state, action) =>
      state
        .update('data', data =>
          data.map(user =>
            user.get('_id') === action.payload.user._id ? action.payload.user : user
          )
        )
        .delete('isLoading')
        .delete('error'),

    [combineActions(
      fetchUsersError,
      deleteUsersError,
      requestUserDeletionError,
      updateUserError
    )]: (state, action) => state.delete('isLoading').set('error', action.payload.error),

    [setSelectedUsers]: (state, action) => state.set('selected', action.payload.selectedUsersList),

    [setUsersPerPage]: (state, action) => state.set('itemsPerPage', action.payload.amount),
  },
  initialState
)

export default users
