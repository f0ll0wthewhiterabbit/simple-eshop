import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  SET_SELECTED_USERS,
  DELETE_USERS_ERROR,
  DELETE_CURRENT_USER_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  DATABASE_FIELD_ROLE_GUEST,
  SIGN_OUT_SUCCESS,
  DELETE_USERS_SUCCESS,
  DELETE_CURRENT_USER_SUCCESS,
} from '../../constants'

const initialState = {
  data: [],
  selected: [],
  current: {
    id: null,
    firstName: '',
    lastName: '',
    role: DATABASE_FIELD_ROLE_GUEST,
    isRemovable: false,
  },
  error: null,
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
    case DELETE_USERS_SUCCESS:
      return {
        ...state,
        data: [...action.payload.usersList],
        error: null,
      }

    case FETCH_USERS_ERROR:
    case DELETE_USERS_ERROR:
    case DELETE_CURRENT_USER_ERROR:
    case SIGN_UP_ERROR:
    case SIGN_IN_ERROR:
      return {
        ...state,
        error: action.payload.error,
      }

    case SET_SELECTED_USERS:
      return {
        ...state,
        selected: [...action.payload.selectedUsersList],
      }

    case DELETE_CURRENT_USER_SUCCESS:
      return {
        ...state,
        data: [...action.payload.usersList],
        current: {
          ...state.current,
          isRemovable: true,
        },
      }

    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          id: action.payload.userData.id,
          firstName: action.payload.userData.firstName,
          lastName: action.payload.userData.lastName,
          role: action.payload.userData.role,
          isRemovable: action.payload.userData.isRemovable,
        },
        error: null,
      }

    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          id: null,
          firstName: '',
          lastName: '',
          role: DATABASE_FIELD_ROLE_GUEST,
          isRemovable: false,
        },
      }

    default:
      return state
  }
}

export default users
