import { FETCH_USERS_SUCCESS, FETCH_USERS_ERROR } from '../../constants'

const initialState = {
  data: [],
  isErrorInLoad: false,
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

    default:
      return state
  }
}

export default users
