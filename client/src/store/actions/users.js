import { createAction } from 'redux-actions'

export const fetchUsersRequest = createAction(
  'USERS/FETCH_USERS_REQUEST',
  (currentPage, itemsPerPage, searchText) => ({
    currentPage,
    itemsPerPage,
    searchText,
  })
)
export const fetchUsersSuccess = createAction(
  'USERS/FETCH_USERS_SUCCESS',
  (usersList, totalAmount, currentPage, itemsPerPage, totalPages) => ({
    usersList,
    totalAmount,
    currentPage,
    itemsPerPage,
    totalPages,
  })
)
export const fetchUsersError = createAction('USERS/FETCH_USERS_ERROR', error => ({ error }))

export const deleteUsersRequest = createAction('USERS/DELETE_USERS_REQUEST')
export const deleteUsersSuccess = createAction('USERS/DELETE_USERS_SUCCESS', deletedUsers => ({
  deletedUsers,
}))
export const deleteUsersError = createAction('USERS/DELETE_USERS_ERROR', error => ({ error }))

export const callForUserDeletionRequest = createAction('USERS/CALL_FOR_USER_DELETION_REQUEST')
export const callForUserDeletionSuccess = createAction(
  'USERS/CALL_FOR_USER_DELETION_SUCCESS',
  userId => ({
    userId,
  })
)
export const callForUserDeletionError = createAction(
  'USERS/CALL_FOR_USER_DELETION_ERROR',
  error => ({
    error,
  })
)

export const updateUserRequest = createAction(
  'USERS/UPDATE_USER_REQUEST',
  (userData, history, setFormSubmitting) => ({
    userData,
    history,
    setFormSubmitting,
  })
)
export const updateUserSuccess = createAction('USERS/UPDATE_USER_SUCCESS', user => ({ user }))
export const updateUserError = createAction('USERS/UPDATE_USER_ERROR', error => ({ error }))

export const setUsersPerPage = createAction('USERS/SET_USERS_PER_PAGE', amount => ({
  amount,
}))

export const startUsersLoading = createAction('USERS/START_USERS_LOADING')

export const setUsersSearchQuery = createAction('USERS/SET_USERS_SEARCH_QUERY', searchQuery => ({
  searchQuery,
}))

export const setSelectedUsers = createAction('USERS/SET_SELECTED_USERS', selectedUsersList => ({
  selectedUsersList,
}))
