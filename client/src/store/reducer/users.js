import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_ERROR,
  REQUEST_USER_DELETION_SUCCESS,
  REQUEST_USER_DELETION_ERROR,
  SET_SELECTED_USERS,
} from '../../constants'

const initialState = {
  data: [],
  selected: [],
  error: null,
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        data: [...action.payload.usersList],
        error: null,
      }

    case DELETE_USERS_SUCCESS:
      return {
        ...state,
        data: state.data.filter(
          user => action.payload.deletedUsers.findIndex(it => it === user._id) === -1
        ),
        error: null,
      }

    case REQUEST_USER_DELETION_SUCCESS:
      return {
        ...state,
        data: state.data.map(user =>
          user._id === action.payload.userId ? { ...user, isRemovable: true } : user
        ),
        error: null,
      }

    case FETCH_USERS_ERROR:
    case DELETE_USERS_ERROR:
    case REQUEST_USER_DELETION_ERROR:
      return {
        ...state,
        error: action.payload.error,
      }

    case SET_SELECTED_USERS:
      return {
        ...state,
        selected: [...action.payload.selectedUsersList],
      }

    default:
      return state
  }
}

export default users
