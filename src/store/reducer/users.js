import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  SET_SELECTED_USERS,
  DELETE_USERS,
  DELETE_USERS_ERROR,
  DELETE_CURRENT_USER,
  DELETE_CURRENT_USER_ERROR,
} from '../../constants'

const initialState = {
  data: [],
  selected: [],
  current: {
    id: 1, // FIXME:
  },
  error: null,
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
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

    case DELETE_USERS:
      return {
        ...state,
        data: state.data.filter(user => !state.selected.includes(user.id)),
      }

    case DELETE_USERS_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_CURRENT_USER:
      return {
        ...state,
        data: state.data.map(user => {
          return user.id !== state.current.id ? user : { ...user, isRemovable: true }
        }),
      }

    case DELETE_CURRENT_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default users
