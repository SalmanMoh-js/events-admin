import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { addDataLoading, loading } from "./auth";
import {
  ADD_DATA_LOADING,
  DATA_UPDATED,
  GET_ERRORS,
  GET_EVENTS,
  GET_TICKETS,
  URL,
} from "./types";

// Update profile
export const updateProfile = (updatedData) => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
  };
  const body = JSON.stringify(updatedData);
  try {
    const res = await axios.post(
      `${URL}/api/admin/${updatedData.id}`,
      body,
      config
    );
    dispatch({
      type: DATA_UPDATED,
      payload: "profile update",
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Update profile
export const updatePassword = (updatedPassword) => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
  };
  const body = JSON.stringify(updatedPassword);
  try {
    const res = await axios.post(
      `${URL}/api/admin/change-password/${updatedPassword.id}`,
      body,
      config
    );
    dispatch({
      type: DATA_UPDATED,
      payload: "password update",
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Post Event
export const postEvent = (eventData) => async (dispatch) => {
  dispatch(addDataLoading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.post(
      `${URL}/api/admin/post-event`,
      eventData,
      config
    );
    dispatch({
      type: DATA_UPDATED,
      payload: "event post",
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get events
export const getEvents = () => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get(`${URL}/api/event`, config);
    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.name === "AxiosError" ? err.name : err.response.data,
    });
  }
};

// Get tickets
export const getTickets = () => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get(`${URL}/api/ticket`, config);
    dispatch({
      type: GET_TICKETS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Approve ticket
export const approveTicket = (ticketData) => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
  };
  const body = JSON.stringify(ticketData);
  try {
    const res = await axios.post(
      `${URL}/api/admin/approve-ticket`,
      body,
      config
    );
    dispatch({
      type: DATA_UPDATED,
      payload: "ticket approve",
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// View event details
export const viewEvent = (id) => async (dispatch) => {
  dispatch(addDataLoading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
  };
  const id = JSON.stringify(id);
  try {
    const res = await axios.post(`${URL}/api/event/${id}`, config);
  } catch (err) {}
};

// Confirm purchase
export const confirmPurchase = (ticketData) => async (dispatch) => {
  dispatch(addDataLoading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
  };
  const body = JSON.stringify(ticketData);
  try {
    const res = await axios.post(
      `${URL}/api/admin/confirm-purchase`,
      body,
      config
    );
    dispatch({
      type: DATA_UPDATED,
      payload: "payment confrim",
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get user's tickets
export const getUserTickets = () => async (dispatch) => {
  dispatch(loading());
  dispatch(addDataLoading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": AsyncStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get(`${URL}/api/ticket/user/:id`, config);
  } catch (err) {}
};
