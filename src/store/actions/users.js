import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  SET_SELECTED_USERS,
  DELETE_USERS,
  DELETE_USERS_ERROR,
  DELETE_CURRENT_USER,
  DELETE_CURRENT_USER_ERROR,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
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

export const deleteUsers = () => ({
  type: DELETE_USERS,
})

export const deleteUsersError = error => ({
  type: DELETE_USERS_ERROR,
  payload: error,
})

export const deleteCurrentUser = () => ({
  type: DELETE_CURRENT_USER,
})

export const deleteCurrentUserError = error => ({
  type: DELETE_CURRENT_USER_ERROR,
  payload: error,
})

export const addUser = userData => ({
  type: ADD_USER,
  payload: userData,
})

export const addUserSuccess = userData => ({
  type: ADD_USER_SUCCESS,
  payload: userData,
})

export const addUserError = error => ({
  type: ADD_USER_ERROR,
  payload: error,
})
