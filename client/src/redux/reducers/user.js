// src/redux/reducers/user.js
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false, // Use `isAuthenticated` consistently
  user: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
    state.user = null;
  },
  LOGIN: (state, action) => {
    state.isAuthenticated = true;
    state.user = action.payload;
  },
  LOGOUT: (state) => {
    state.isAuthenticated = false;
    state.user = null;
  },
});

export default userReducer;
