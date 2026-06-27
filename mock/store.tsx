import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from '../../src/redux/store/slices/HotelSlice';
import accountReducer from '../../src/redux/store/slices/accountSlice';

export const createTestStore = (preloadedState?: any) => {
  return configureStore({
    reducer: {
      hotels: hotelsReducer,
      account: accountReducer,
    },
    preloadedState,
  });
};

export const renderWithStore = (component: React.ReactElement, preloadedState?: any) => {
  const store = createTestStore(preloadedState);
  return {
    component: <Provider store={store}>{component}</Provider>,
    store,
  };
};
