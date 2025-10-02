import { configureStore } from "@reduxjs/toolkit";
import { userUpdateReducer } from "./reducers/userReducers";

const store = configureStore({
  reducer: {
    user: userUpdateReducer,
  },
});

export default store;
