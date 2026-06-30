import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from './slices/HotelSlice';
import accountReducer from './slices/accountSlice';
import homeReducer from './slices/homeSlice';
import bookingReducer from './slices/bookingSlice';

export const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    account: accountReducer,
    home: homeReducer,
    booking: bookingReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
