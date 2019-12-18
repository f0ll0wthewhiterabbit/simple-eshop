import { handleActions, combineActions } from 'redux-actions'
import { fromJS } from 'immutable'

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

const initialState = fromJS({
  data: [],
  selected: [],
  isLoading: false,
  error: null,
})

const users = handleActions(
  {
    [combineActions(fetchUsers, deleteUsers, requestUserDeletion)]: state =>
      state.set('isLoading', true),
    [fetchUsersSuccess]: (state, action) =>
      state.merge({
        data: fromJS(action.payload.usersList),
        isLoading: false,
        error: null,
      }),
    [deleteUsersSuccess]: (state, action) =>
      state
        .update('data', data =>
          data.filter(
            user => action.payload.deletedUsers.findIndex(it => it === user.get('_id')) === -1
          )
        )
        .merge({
          isLoading: false,
          error: null,
        }),
    [requestUserDeletionSuccess]: (state, action) =>
      state
        .update('data', data =>
          data.map(user =>
            user.get('_id') === action.payload.userId ? user.set('isRemovable', true) : user
          )
        )
        .merge({
          isLoading: false,
          error: null,
        }),
    [combineActions(fetchUsersError, deleteUsersError, requestUserDeletionError)]: (
      state,
      action
    ) =>
      state.merge({
        isLoading: false,
        error: action.payload.error,
      }),
    [setSelectedUsers]: (state, action) => state.set('selected', action.payload.selectedUsersList),
  },
  initialState
)

export default users
