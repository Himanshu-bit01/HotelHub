import React, { createContext, use, useMemo, useReducer, ReactNode } from 'react';
import { HomeContextValue } from '../../types';

type HomeState = {
  selectedTab: string;
  destination: string;
  checkInOut: string;
  guests: number;
  rooms: number;
};

type HomeAction =
  | { type: 'SET_SELECTED_TAB'; payload: string }
  | { type: 'SET_DESTINATION'; payload: string }
  | { type: 'SET_CHECK_IN_OUT'; payload: string }
  | { type: 'SET_GUESTS'; payload: number }
  | { type: 'SET_ROOMS'; payload: number };

const initialState: HomeState = {
  selectedTab: 'Search',
  destination: '',
  checkInOut: '',
  guests: 2,
  rooms: 1,
};

function homeReducer(state: HomeState, action: HomeAction): HomeState {
  switch (action.type) {
    case 'SET_SELECTED_TAB':
      return { ...state, selectedTab: action.payload };
    case 'SET_DESTINATION':
      return { ...state, destination: action.payload };
    case 'SET_CHECK_IN_OUT':
      return { ...state, checkInOut: action.payload };
    case 'SET_GUESTS':
      return { ...state, guests: action.payload };
    case 'SET_ROOMS':
      return { ...state, rooms: action.payload };
    default:
      return state;
  }
}

const HomeContext = createContext<HomeContextValue | undefined>(undefined);

export const HomeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(homeReducer, initialState);

  const value = useMemo<HomeContextValue>(
    () => ({
      selectedTab: state.selectedTab,
      setSelectedTab: (tab: string) => dispatch({ type: 'SET_SELECTED_TAB', payload: tab }),
      destination: state.destination,
      setDestination: (dest: string) => dispatch({ type: 'SET_DESTINATION', payload: dest }),
      checkInOut: state.checkInOut,
      setCheckInOut: (dates: string) => dispatch({ type: 'SET_CHECK_IN_OUT', payload: dates }),
      guests: state.guests,
      setGuests: (guests: number) => dispatch({ type: 'SET_GUESTS', payload: guests }),
      rooms: state.rooms,
      setRooms: (rooms: number) => dispatch({ type: 'SET_ROOMS', payload: rooms }),
    }),
    [state]
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export const useHomeContext = (): HomeContextValue => {
  const ctx = use(HomeContext);
  if (ctx === undefined) {
    throw new Error('useHomeContext must be used within a HomeProvider');
  }
  return ctx;
};
