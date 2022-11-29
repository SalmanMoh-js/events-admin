import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
  ADD_DATA_LOADING,
  AUTH_ERROR,
  GET_ERRORS,
  LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  OTP_LOGIN,
  RESET_DATA,
  RESET_ERRORS,
  RESET_UPDATE,
  URL,
  USER_LOADED,
} from "./types";

// Login
export const login = (email, password) => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 5000,
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${URL}/api/auth/admin`, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token,
    });
    try {
      await AsyncStorage.setItem("token", res.data.token);
    } catch (e) {
      console.log(e);
    }
    dispatch(loadAdmin());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    if (err.request) {
      let errs = {};
      errs.connection = true;
      dispatch({
        type: GET_ERRORS,
        payload: errs,
      });
      console.log("Error request: ", err.request);
    } else if (err.response) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      console.log("Error response: ", err.response);
    } else {
      let errs = {};
      errs.unknown = true;
      dispatch({
        type: GET_ERRORS,
        payload: errs,
      });
      console.log("Error: ", err);
    }
  }
};

// Login With Otp
export const otpLogin =
  ({ email, otp }) =>
  async (dispatch) => {
    dispatch(loading());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, otp });

    try {
      const res = await axios.post(`${URL}/api/calendar/otp`, body, config);
      dispatch({
        type: OTP_LOGIN,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };

// Load Admin
export const loadAdmin = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("Token: ", token);
    setAuthToken(token);
  } catch (err) {
    console.log(err);
  }
  try {
    const res = await axios.get(`${URL}/api/auth/admin`);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: AUTH_ERROR,
    });
    if (err.response) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    } else if (err.request) {
      let errs = {};
      errs.connection = true;
      dispatch({
        type: GET_ERRORS,
        payload: errs,
      });
    } else {
      let errs = {};
      errs.unknown = true;
      dispatch({
        type: GET_ERRORS,
        payload: errs,
      });
    }
  }
};

export const emptyErrors = () => (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    payload: {},
  });
};

export const loading = () => (dispatch) => {
  dispatch({ type: LOADING });
};

export const addDataLoading = () => (dispatch) => {
  dispatch({ type: ADD_DATA_LOADING });
};
// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  AsyncStorage.removeItem("token");
};

export const resetUpdate = () => (dispatch) => {
  dispatch({
    type: RESET_UPDATE,
  });
};

export const resetData = () => (dispatch) => {
  AsyncStorage.removeItem("token");
  dispatch({
    type: RESET_DATA,
  });
};

const setAddDataLoading = () => async (dispatch) => {
  dispatch({
    type: ADD_DATA_LOADING,
  });
};

// export const newPassword =
//   ({ email, password }) =>
//   async (dispatch) => {
//     dispatch(setLoading());
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const body = JSON.stringify({ email, password });

//     try {
//       const res = await axios.post(
//         "http://ethioumrah.vohealth.org/api/calendar/new-password",
//         body,
//         config
//       );
//       dispatch({
//         type: DATA_UPDATED,
//         payload: "password set",
//       });
//     } catch (err) {
//       console.log(err.response.data);
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data,
//       });
//     }
//   };

// export const changePassword =
//   ({ email, oldPassword, newPassword }) =>
//   async (dispatch) => {
//     dispatch(setLoading());
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const body = JSON.stringify({ email, oldPassword, newPassword });

//     try {
//       const res = await axios.post(
//         "http://ethioumrah.vohealth.org/api/calendar/change-password",
//         body,
//         config
//       );
//       dispatch({
//         type: DATA_UPDATED,
//         payload: "password changed",
//       });
//     } catch (err) {
//       console.log(err.response.data);
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data,
//       });
//     }
//   };
