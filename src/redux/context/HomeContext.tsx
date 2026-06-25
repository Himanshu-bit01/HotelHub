import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { HomeContextValue } from '../../types';

const HomeContext = createContext<HomeContextValue | undefined>(undefined);

export const HomeProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTab, setSelectedTab] = useState<string>('Search');
  const [destination, setDestination] = useState<string>('');
  const [checkInOut, setCheckInOut] = useState<string>('');
  const [guests, setGuests] = useState<number>(2);
  const [rooms, setRooms] = useState<number>(1);

  const value = useMemo<HomeContextValue>(
    () => ({
      selectedTab,
      setSelectedTab,
      destination,
      setDestination,
      checkInOut,
      setCheckInOut,
      guests,
      setGuests,
      rooms,
      setRooms,
    }),
    [selectedTab, destination, checkInOut, guests, rooms]
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export const useHomeContext = (): HomeContextValue => {
  const ctx = useContext(HomeContext);
  if (ctx === undefined) {
    throw new Error('useHomeContext must be used within a HomeProvider');
  }
  return ctx;
};

export default HomeContext;
