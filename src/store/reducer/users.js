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
      return {
        ...state,
        data: [...action.payload],
        error: null,
      }

    case FETCH_USERS_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    case SET_SELECTED_USERS:
      return {
        ...state,
        selected: [...action.payload],
      }

    case DELETE_USERS_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
      }

    case DELETE_USERS_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_CURRENT_USER_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
        current: {
          ...state.current,
          isRemovable: true,
        },
      }

    case DELETE_CURRENT_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          role: action.payload.role,
          isRemovable: action.payload.isRemovable,
        },
        error: null,
      }

    case SIGN_UP_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          role: action.payload.role,
          isRemovable: action.payload.isRemovable,
        },
        error: null,
      }

    case SIGN_IN_ERROR:
      return {
        ...state,
        error: action.payload,
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
