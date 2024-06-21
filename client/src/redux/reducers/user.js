import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(initialState, {
  LoginRequest: (state) => {
    state.loading = true;
    state.error = null; // Clear any previous errors on new login attempt
  },
  LoginSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
    state.error = null;
  },
  LoginFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
    state.user = null;
  },
  LogoutRequest: (state) => {
    state.loading = true;
  },
  LogoutSuccess: (state) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = null;
    state.error = null;
  },
  LogoutFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  LoadUserRequest: (state) => {
    state.loading = true;
    state.error = null;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
    state.error = null;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
    state.user = null;
  },
  updateUserInfoRequest: (state) => {
    state.loading = true;
    state.error = null;
  },
  updateUserInfoSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.error = null;
  },
  updateUserInfoFailed: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  getAllUsersRequest: (state) => {
    state.loading = true;
    state.error = null;
  },
  getAllUsersSuccess: (state, action) => {
    state.loading = false;
    state.error = null;
    state.users = action.payload;
  },
  getAllUsersFailed: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

export default userReducer;
