import { createSlice } from "@reduxjs/toolkit";

const userLocal = JSON.parse(localStorage.getItem("user")) || null;
const infoUserLocal = JSON.parse(localStorage.getItem("infoUser")) || null;
const initialState = {
  currentUser: userLocal,
  infomationUser: infoUserLocal,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      localStorage.setItem("user", JSON.stringify(payload));
      state.currentUser = payload;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.currentUser = null;
      state.infomationUser = null;
    },
    setInfoUser: (state, { payload }) => {
      localStorage.setItem("infoUser", JSON.stringify(payload));
      state.infomationUser = payload;
    },
  },
});

export const { setCurrentUser, logout, setInfoUser } = userSlice.actions;
export default userSlice.reducer;
