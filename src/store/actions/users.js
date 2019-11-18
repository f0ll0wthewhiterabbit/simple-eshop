import { FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR } from '../../constants'

export const fetchUsers = () => ({
  type: FETCH_USERS,
})

export const fetchUsersSuccess = usersList => ({
  type: FETCH_USERS_SUCCESS,
  payload: usersList,
})

export const fetchUsersError = () => ({
  type: FETCH_USERS_ERROR,
})
