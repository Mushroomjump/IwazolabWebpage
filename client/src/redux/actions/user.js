import axios from "axios";
import { server } from "../../server";

// Action Types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAIL = "LOAD_USER_FAIL";

// Load user action
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response?.data?.message || "Failed to load user",
    });
  }
};

// Login action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post(
      `${server}/user/login`,
      { email, password },
      { withCredentials: true }
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.message || "Login failed",
    });
  }
};

// Logout action
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });

    await axios.get(`${server}/user/logout`, { withCredentials: true });

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response?.data?.message || "Logout failed",
    });
  }
};
