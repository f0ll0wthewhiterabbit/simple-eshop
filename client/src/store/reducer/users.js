import { handleActions, combineActions } from 'redux-actions'

import {
  fetchUsersSuccess,
  fetchUsersError,
  setSelectedUsers,
  deleteUsersSuccess,
  deleteUsersError,
  requestUserDeletionSuccess,
  requestUserDeletionError,
} from '../actions'

const initialState = {
  data: [],
  selected: [],
  error: null,
}

const users = handleActions(
  {
    [fetchUsersSuccess]: (state, action) => ({
      ...state,
      data: [...action.payload.usersList],
      error: null,
    }),
    [deleteUsersSuccess]: (state, action) => ({
      ...state,
      data: state.data.filter(
        user => action.payload.deletedUsers.findIndex(it => it === user._id) === -1
      ),
      error: null,
    }),
    [requestUserDeletionSuccess]: (state, action) => ({
      ...state,
      data: state.data.map(user =>
        user._id === action.payload.userId ? { ...user, isRemovable: true } : user
      ),
      error: null,
    }),
    [combineActions(fetchUsersError, deleteUsersError, requestUserDeletionError)]: (
      state,
      action
    ) => ({
      ...state,
      error: action.payload.error,
    }),
    [setSelectedUsers]: (state, action) => ({
      ...state,
      selected: [...action.payload.selectedUsersList],
    }),
  },
  initialState
)

export default users
