import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isOpen: false,
    popupType: null,
  },
  reducers: {
    openPopup: (state, action) => {
      state.isOpen = true;
      state.popupType = action.payload; 
    },
    closePopup: (state) => {
      state.isOpen = false;
      state.popupType = null;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
