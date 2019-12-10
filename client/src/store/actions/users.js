import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  SET_SELECTED_USERS,
  DELETE_USERS,
  DELETE_USERS_ERROR,
  DELETE_USERS_SUCCESS,
  REQUEST_USER_DELETION,
  REQUEST_USER_DELETION_SUCCESS,
  REQUEST_USER_DELETION_ERROR,
} from '../../constants'

export const fetchUsers = () => ({
  type: FETCH_USERS,
})

export const fetchUsersSuccess = usersList => ({
  type: FETCH_USERS_SUCCESS,
  payload: { usersList },
})

export const fetchUsersError = error => ({
  type: FETCH_USERS_ERROR,
  payload: { error },
})

export const setSelectedUsers = selectedUsersList => ({
  type: SET_SELECTED_USERS,
  payload: { selectedUsersList },
})

export const deleteUsers = () => ({
  type: DELETE_USERS,
})

export const deleteUsersSuccess = deletedUsers => ({
  type: DELETE_USERS_SUCCESS,
  payload: { deletedUsers },
})

export const deleteUsersError = error => ({
  type: DELETE_USERS_ERROR,
  payload: { error },
})

export const requestUserDeletion = () => ({
  type: REQUEST_USER_DELETION,
})

export const requestUserDeletionSuccess = userId => ({
  type: REQUEST_USER_DELETION_SUCCESS,
  payload: { userId },
})

export const requestUserDeletionError = error => ({
  type: REQUEST_USER_DELETION_ERROR,
  payload: { error },
})
