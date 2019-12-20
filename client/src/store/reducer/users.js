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
} from '../actions'

const UsersRecord = Record({
  data: List(),
  selected: List(),
  isLoading: false,
  error: null,
})
const initialState = new UsersRecord()

const users = handleActions(
  {
    [combineActions(fetchUsers, deleteUsers, requestUserDeletion)]: state =>
      state.set('isLoading', true),
    [fetchUsersSuccess]: (state, action) =>
      state
        .set('data', action.payload.usersList)
        .delete('isLoading')
        .delete('error'),
    [deleteUsersSuccess]: (state, action) =>
      state
        .update('data', data =>
          data.filter(
            user => action.payload.deletedUsers.findIndex(it => it === user.get('_id')) === -1
          )
        )
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
    [combineActions(fetchUsersError, deleteUsersError, requestUserDeletionError)]: (
      state,
      action
    ) => state.delete('isLoading').set('error', action.payload.error),
    [setSelectedUsers]: (state, action) => state.set('selected', action.payload.selectedUsersList),
  },
  initialState
)

export default users
