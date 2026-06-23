import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from './slices/HotelSlice';
import accountReducer from './slices/accountSlice';

export const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    account: accountReducer,
  },
});

export default store;