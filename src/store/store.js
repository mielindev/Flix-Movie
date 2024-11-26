import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user.slice";
const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice,
  },
});
export default store;
