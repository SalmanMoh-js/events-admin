import {
  LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  RESET_DATA,
} from "../Actions/types";

const initialState = {
  isAuthenticated: null,
  loading: false,
  user: null,
};

export const authReducer = async (state = initialState, action) => {
  const { type, payload } = action;

  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case RESET_DATA:
      return {
        ...state,
        isAuthenticated: null,
        loading: false,
        user: null,
      };
    default:
      return initialState;
  }
};
