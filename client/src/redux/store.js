// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";

export const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers here
  },
});
