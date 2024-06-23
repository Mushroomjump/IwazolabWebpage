import { createReducer } from "@reduxjs/toolkit";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from "../actions/user";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const userReducer = createReducer(initialState, {
  [LOGIN_REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [LOGIN_SUCCESS]: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
    state.error = null;
  },
  [LOGIN_FAIL]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
    state.user = null;
  },
  [LOGOUT_REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [LOGOUT_SUCCESS]: (state) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = null;
    state.error = null;
  },
  [LOGOUT_FAIL]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [LOAD_USER_REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [LOAD_USER_SUCCESS]: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
    state.error = null;
  },
  [LOAD_USER_FAIL]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
    state.user = null;
  },
});

export default userReducer;
