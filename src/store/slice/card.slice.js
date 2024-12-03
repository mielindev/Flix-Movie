import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCard: [],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addToCard: (state, { payload }) => {
      state.currentCard.push(payload);
    },
  },
});

export const { addToCard } = cardSlice.actions;
export default cardSlice.reducer;
