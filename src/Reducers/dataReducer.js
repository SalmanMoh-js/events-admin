import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ADD_DATA_LOADING,
  CLEAR_NOTIFICATIONS,
  DATA_UPDATED,
  GET_ERRORS,
  LOADING,
  OTP_LOGIN,
  RESET_DATA,
  RESET_ERRORS,
  RESET_UPDATE,
  SET_NOTIFICATIONS,
  SET_USER,
} from "../Actions/types";

const initialState = {
  user: null,
  otpUser: null,
  dataUpdated: "",
  addDataLoading: false,
  loading: false,
  errors: {},
};

const updateMessage = (payload, messages) => {
  messages.map((message) => {
    if (message.id === payload.id) {
      message.message = payload.message;
    }
  });
  return messages;
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
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: [payload, ...state.notifications],
      };
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
      };
    // case GET_ACADEMIC_CALENDAR:
    //   return {
    //     ...state,
    //     academicCalendar: payload,
    //     loading: false,
    //   };
    // case SEND_MESSAGES:
    //   return {
    //     ...state,
    //     messages: [...state.messages, payload],
    //     loading: false,
    //     addDataLoading: false,
    //   };
    // case UPDATE_MESSAGE:
    //   return {
    //     ...state,
    //     messages: updateMessage(payload, state.messages),
    //     loading: false,
    //     addDataLoading: false,
    //   };
    // case DELETE_MESSAGE:
    //   return {
    //     ...state,
    //     messages: state.messages.filter((message) => message.id !== payload),
    //     loading: false,
    //     addDataLoading: false,
    //   };
    case DATA_UPDATED:
      return {
        ...state,
        dataUpdated: payload,
        loading: false,
        addDataLoading: false,
      };
    case OTP_LOGIN:
      return {
        ...state,
        otpUser: payload,
        loading: false,
      };
    case GET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case RESET_UPDATE:
      return {
        ...state,
        dataUpdated: "",
      };
    case RESET_ERRORS:
      return {
        ...state,
        errors: {},
      };
    case RESET_DATA:
      return {
        ...state,
        loading: false,
        addDataLoading: false,
        errors: {},
        dataUpdated: "",
        user: null,
        otpUser: null,
      };
    case SET_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    default:
      return state;
  }
};
