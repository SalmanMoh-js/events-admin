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
    timeout: 5000,
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

// Update profile
export const updatePassword = (updatedPassword) => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
    timeout: 5000,
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

// Post Event
export const postEvent = (eventData) => async (dispatch) => {
  dispatch(addDataLoading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
    timeout: 5000,
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

// Get events
export const getEvents = () => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
    timeout: 5000,
  };
  try {
    const res = await axios.get(`${URL}/api/event`, config);
    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
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

// Get tickets
export const getTickets = () => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
    timeout: 5000,
  };
  try {
    const res = await axios.get(`${URL}/api/ticket`, config);
    dispatch({
      type: GET_TICKETS,
      payload: res.data,
    });
    console.log(res.data);
  } catch (err) {
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

// Approve ticket
export const approveTicket = (ticketData) => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
    timeout: 5000,
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

// Confirm purchase
export const confirmPurchase = (ticketData) => async (dispatch) => {
  dispatch(addDataLoading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
    timeout: 5000,
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
