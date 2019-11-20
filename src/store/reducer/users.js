import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  SET_SELECTED_USERS,
  DELETE_SELECTED_USERS,
  DELETE_SELECTED_USERS_ERROR,
} from '../../constants'

const initialState = {
  data: [],
  selected: [],
  isErrorInLoad: false,
  isErrorInDeletetion: false,
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }

    case FETCH_USERS_ERROR:
      return {
        ...state,
        isErrorInLoad: true,
      }

    case SET_SELECTED_USERS:
      return {
        ...state,
        selected: [...action.payload],
      }

    case DELETE_SELECTED_USERS:
      return {
        ...state,
        data: state.data.filter(user => !state.selected.includes(user.id)),
      }

    case DELETE_SELECTED_USERS_ERROR:
      return {
        ...state,
        isErrorInDeletetion: true,
      }

    default:
      return state
  }
}

export default users
