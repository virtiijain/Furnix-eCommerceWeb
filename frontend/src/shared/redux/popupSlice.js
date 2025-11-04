import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isOpen: false,
    popupType: null, // can be "signup" or "login"
  },
  reducers: {
    openPopup: (state, action) => {
      state.isOpen = true;
      state.popupType = action.payload; // pass "signup" or "login"
    },
    closePopup: (state) => {
      state.isOpen = false;
      state.popupType = null;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
