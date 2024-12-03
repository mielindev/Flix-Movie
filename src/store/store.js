import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user.slice";
import cardSlice from "./slice/card.slice";
const store = configureStore({
  reducer: {
    user: userSlice,
    card: cardSlice,
  },
});
export default store;
