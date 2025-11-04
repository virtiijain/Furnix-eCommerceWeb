import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './popupSlice';

const store = configureStore({
  reducer: {
    popup: popupReducer,
  },
});

export default store;