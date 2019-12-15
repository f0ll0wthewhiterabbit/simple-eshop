import { createActions } from 'redux-actions'

const { users } = createActions({
  USERS: {
    FETCH_USERS: undefined,
    FETCH_USERS_SUCCESS: usersList => ({ usersList }),
    FETCH_USERS_ERROR: error => ({ error }),
    SET_SELECTED_USERS: selectedUsersList => ({ selectedUsersList }),
    DELETE_USERS: undefined,
    DELETE_USERS_SUCCESS: deletedUsers => ({ deletedUsers }),
    DELETE_USERS_ERROR: error => ({ error }),
    REQUEST_USER_DELETION: undefined,
    REQUEST_USER_DELETION_SUCCESS: userId => ({ userId }),
    REQUEST_USER_DELETION_ERROR: error => ({ error }),
  },
})

export const {
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
} = users
