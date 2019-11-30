import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  SET_SELECTED_USERS,
  DELETE_USERS_ERROR,
  DELETE_CURRENT_USER_ERROR,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
  DELETE_USERS_SUCCESS,
  DELETE_CURRENT_USER_SUCCESS,
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

export const deleteUsersSuccess = usersList => ({
  type: DELETE_USERS_SUCCESS,
  payload: { usersList },
})

export const deleteUsersError = error => ({
  type: DELETE_USERS_ERROR,
  payload: { error },
})

export const deleteCurrentUserSuccess = usersList => ({
  type: DELETE_CURRENT_USER_SUCCESS,
  payload: { usersList },
})

export const deleteCurrentUserError = error => ({
  type: DELETE_CURRENT_USER_ERROR,
  payload: { error },
})

export const signUp = userData => ({
  type: SIGN_UP,
  payload: { userData },
})

export const signUpSuccess = userData => ({
  type: SIGN_UP_SUCCESS,
  payload: { userData },
})

export const signUpError = error => ({
  type: SIGN_UP_ERROR,
  payload: { error },
})

export const signIn = userData => ({
  type: SIGN_IN,
  payload: { userData },
})

export const signInSuccess = userData => ({
  type: SIGN_IN_SUCCESS,
  payload: { userData },
})

export const signInError = error => ({
  type: SIGN_IN_ERROR,
  payload: { error },
})

export const signOut = (history, location) => ({
  type: SIGN_OUT,
  payload: { history, location },
})

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
})
