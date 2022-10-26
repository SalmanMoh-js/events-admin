// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import {} from "./types";

// // Login
// export const userLogin =
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
//         "http://ethioumrah.vohealth.org/api/calendar/login",
//         body,
//         config
//       );
//       dispatch(setUser(res.data));
//     } catch (err) {
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data,
//       });
//     }
//   };

// // Login With Otp
// export const otpLogin =
//   ({ email, otp }) =>
//   async (dispatch) => {
//     dispatch(setLoading());
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const body = JSON.stringify({ email, otp });

//     try {
//       const res = await axios.post(
//         "http://ethioumrah.vohealth.org/api/calendar/otp",
//         body,
//         config
//       );
//       dispatch({
//         type: OTP_LOGIN,
//         payload: res.data,
//       });
//     } catch (err) {
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data,
//       });
//     }
//   };

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

// export const getPlanCalendar = () => async (dispatch) => {
//   dispatch(setLoading());
//   try {
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     const res = await axios.get(
//       "http://ethioumrah.vohealth.org/api/calendar/plan-calendar",
//       { headers }
//     );
//     dispatch({
//       type: GET_PLAN_CALENDAR,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: GET_ERRORS,
//       payload: err.response.data,
//     });
//   }
// };

// export const updateBudgetCalendar = (newDate) => async (dispatch) => {
//   dispatch(setAddDataLoading());
//   try {
//     const headers = {
//       "Content-Type": "application/json",
//     };

//     const body = JSON.stringify(newDate);
//     const res = await axios.post(
//       "http://ethioumrah.vohealth.org/api/calendar/update-budget-calendar",
//       body,
//       { headers }
//     );
//     dispatch({
//       type: DATA_UPDATED,
//       payload: "date updated",
//     });
//   } catch (err) {
//     dispatch({
//       type: GET_ERRORS,
//       payload: err.response.data,
//     });
//   }
// };

// export const sendRequest = (request) => async (dispatch) => {
//   dispatch(setAddDataLoading());
//   try {
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     const body = JSON.stringify(request);
//     const res = await axios.post(
//       "http://ethioumrah.vohealth.org/api/calendar/send-request",
//       body,
//       { headers }
//     );
//     dispatch({
//       type: DATA_UPDATED,
//       payload: "request sent",
//     });
//   } catch (err) {
//     dispatch({
//       type: GET_ERRORS,
//       payload: err.response.data,
//     });
//   }
// };

// export const setUser = (userData) => (dispatch) => {
//   dispatch({
//     type: SET_USER,
//     payload: userData,
//   });
// };
// export const resetData = () => (dispatch) => {
//   dispatch({
//     type: RESET_DATA,
//   });
// };
// export const resetUpdate = () => (dispatch) => {
//   dispatch({
//     type: RESET_UPDATE,
//   });
// };

// export const resetErrors = () => (dispatch) => {
//   dispatch({
//     type: RESET_ERRORS,
//   });
// };
// const setLoading = () => async (dispatch) => {
//   dispatch({
//     type: LOADING,
//   });
// };

// const setAddDataLoading = () => async (dispatch) => {
//   dispatch({
//     type: ADD_DATA_LOADING,
//   });
// };

// export const setNotif = (notif) => async (dispatch) => {
//   notif.map((notification) => {
//     dispatch({
//       type: SET_NOTIFICATIONS,
//       payload: notification,
//     });
//   });
// };

// export const clearNotifications = () => async (dispatch) => {
//   dispatch({
//     type: CLEAR_NOTIFICATIONS,
//   });
// };
