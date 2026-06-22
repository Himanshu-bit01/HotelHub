import React, { createContext, useContext, useMemo, useState } from 'react';

const HomeContext = createContext(undefined);

/**
 * Holds all "form / UI selection" state shared between HeroSection
 * (search tabs) and SearchAndStays (search form fields). This is
 * intentionally separate from Redux: this is ephemeral, screen-local UI
 * state, not server data, so Context is the right tool here.
 */

export const HomeProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState('Search');
  const [destination, setDestination] = useState('');
  const [checkInOut, setCheckInOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  const value = useMemo(
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

export const useHomeContext = () => {
  const ctx = useContext(HomeContext);
  if (ctx === undefined) {
    throw new Error('useHomeContext must be used within a HomeProvider');
  }
  return ctx;
};

export default HomeContext;