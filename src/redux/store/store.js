import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from './slices/HotelSlice';

export const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
  },
});

export default store;