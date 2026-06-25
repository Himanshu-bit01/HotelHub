import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from './slices/HotelSlice';
import accountReducer from './slices/accountSlice';


export const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    account: accountReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
