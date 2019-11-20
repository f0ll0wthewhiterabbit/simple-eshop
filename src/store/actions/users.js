import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  SET_SELECTED_USERS,
  DELETE_SELECTED_USERS,
  DELETE_SELECTED_USERS_ERROR,
} from '../../constants'

export const fetchUsers = () => ({
  type: FETCH_USERS,
})

export const fetchUsersSuccess = usersList => ({
  type: FETCH_USERS_SUCCESS,
  payload: usersList,
})

export const fetchUsersError = error => ({
  type: FETCH_USERS_ERROR,
  payload: error,
})

export const setSelectedUsers = selectedUsersList => ({
  type: SET_SELECTED_USERS,
  payload: selectedUsersList,
})

export const deleteSelectedUsers = () => ({
  type: DELETE_SELECTED_USERS,
})

export const deleteSelectedUsersError = error => ({
  type: DELETE_SELECTED_USERS_ERROR,
  payload: error,
})
