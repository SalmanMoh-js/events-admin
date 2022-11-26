import {
  ADD_DATA_LOADING,
  AUTH_ERROR,
  DATA_UPDATED,
  DELETE_EVENT,
  DELETE_TICKET,
  GET_ERRORS,
  GET_EVENTS,
  GET_TICKETS,
  LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  OTP_LOGIN,
  RESET_DATA,
  RESET_UPDATE,
  USER_LOADED,
} from "../Actions/types";

const initialState = {
  user: null,
  isAuthenticated: false,
  events: [],
  tickets: [],
  dataUpdated: "",
  addDataLoading: false,
  loading: false,
};

export const dataReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_DATA_LOADING:
      return {
        ...state,
        addDataLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        addDataLoading: false,
        user: payload,
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
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false,
      };
    case GET_TICKETS:
      return {
        ...state,
        tickets: payload,
        loading: false,
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== payload),
        loading: false,
        addDataLoading: false,
      };
    case DELETE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter((ticket) => ticket.id !== payload),
        loading: false,
        addDataLoading: false,
      };
    case DATA_UPDATED:
      return {
        ...state,
        dataUpdated: payload,
        loading: false,
        addDataLoading: false,
      };
    case GET_ERRORS:
      return {
        ...state,
        loading: false,
        addDataLoading: false,
      };
    case RESET_UPDATE:
      return {
        ...state,
        dataUpdated: "",
      };
    case RESET_DATA:
      return {
        ...state,
        events: [],
        tickets: [],
        dataUpdated: "",
        addDataLoading: false,
        isAuthenticated: null,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};
