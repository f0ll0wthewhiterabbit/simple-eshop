import {
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_SUCCESS,
  DATABASE_FIELD_ROLE_GUEST,
} from '../../constants'

const initialState = {
  isAuthenticated: false,
  token: null,
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: DATABASE_FIELD_ROLE_GUEST,
    isRemovable: false,
  },
  error: null,
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          ...state.user,
          id: action.payload.userData.id,
          firstName: action.payload.userData.firstName,
          lastName: action.payload.userData.lastName,
          email: action.payload.userData.email,
          role: action.payload.userData.role,
          isRemovable: action.payload.userData.isRemovable,
        },
        error: null,
      }

    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        error: null,
      }

    case AUTHENTICATE_ERROR:
    case SIGN_UP_ERROR:
    case SIGN_IN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: {
          ...state.user,
          id: '',
          firstName: '',
          lastName: '',
          email: '',
          role: DATABASE_FIELD_ROLE_GUEST,
          isRemovable: false,
        },
        error: action.payload.error,
      }

    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: {
          id: '',
          firstName: '',
          lastName: '',
          email: '',
          role: DATABASE_FIELD_ROLE_GUEST,
          isRemovable: false,
        },
        error: '',
      }

    default:
      return state
  }
}

export default auth
