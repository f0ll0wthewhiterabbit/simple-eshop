import { createAction } from 'redux-actions'

export const fetchUsers = createAction('FETCH_USERS')
export const fetchUsersSuccess = createAction('FETCH_USERS_SUCCESS', usersList => ({ usersList }))
export const fetchUsersError = createAction('FETCH_USERS_ERROR', error => ({ error }))
export const setSelectedUsers = createAction('SET_SELECTED_USERS', selectedUsersList => ({
  selectedUsersList,
}))
export const deleteUsers = createAction('DELETE_USERS')
export const deleteUsersSuccess = createAction('DELETE_USERS_SUCCESS', deletedUsers => ({
  deletedUsers,
}))
export const deleteUsersError = createAction('DELETE_USERS_ERROR', error => ({ error }))
export const requestUserDeletion = createAction('REQUEST_USER_DELETION')
export const requestUserDeletionSuccess = createAction('REQUEST_USER_DELETION_SUCCESS', userId => ({
  userId,
}))
export const requestUserDeletionError = createAction('REQUEST_USER_DELETION_ERROR', error => ({
  error,
}))
