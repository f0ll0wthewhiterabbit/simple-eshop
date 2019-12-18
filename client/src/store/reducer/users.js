import { handleActions, combineActions } from 'redux-actions'
import { fromJS } from 'immutable'

import {
  fetchUsersSuccess,
  fetchUsersError,
  setSelectedUsers,
  deleteUsersSuccess,
  deleteUsersError,
  requestUserDeletionSuccess,
  requestUserDeletionError,
} from '../actions'

const initialState = fromJS({
  data: [],
  selected: [],
  error: null,
})

const users = handleActions(
  {
    [fetchUsersSuccess]: (state, action) =>
      state.merge({
        data: fromJS(action.payload.usersList),
        error: null,
      }),
    [deleteUsersSuccess]: (state, action) =>
      state
        .update('data', data =>
          data.filter(
            user => action.payload.deletedUsers.findIndex(it => it === user.get('_id')) === -1
          )
        )
        .set('error', null),
    [requestUserDeletionSuccess]: (state, action) =>
      state
        .update('data', data =>
          data.map(user =>
            user.get('_id') === action.payload.userId ? user.set('isRemovable', true) : user
          )
        )
        .set('error', null),
    [combineActions(fetchUsersError, deleteUsersError, requestUserDeletionError)]: (
      state,
      action
    ) => state.set('error', action.payload.error),
    [setSelectedUsers]: (state, action) => state.set('selected', action.payload.selectedUsersList),
  },
  initialState
)

export default users
