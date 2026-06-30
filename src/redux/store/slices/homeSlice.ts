import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HomeState {
  selectedTab: string;
  destination: string;
  checkInOut: string;
  guests: number;
  rooms: number;
}

const initialState: HomeState = {
  selectedTab: 'Search',
  destination: '',
  checkInOut: '',
  guests: 2,
  rooms: 1,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSelectedTab(state, action: PayloadAction<string>) {
      if (state.selectedTab !== action.payload) {
        state.selectedTab = action.payload;
      }
    },
    setDestination(state, action: PayloadAction<string>) {
      if (state.destination !== action.payload) {
        state.destination = action.payload;
      }
    },
    setCheckInOut(state, action: PayloadAction<string>) {
      if (state.checkInOut !== action.payload) {
        state.checkInOut = action.payload;
      }
    },
    setGuests(state, action: PayloadAction<number>) {
      if (state.guests !== action.payload) {
        state.guests = action.payload;
      }
    },
    setRooms(state, action: PayloadAction<number>) {
      if (state.rooms !== action.payload) {
        state.rooms = action.payload;
      }
    },
  },
});

export const { setSelectedTab, setDestination, setCheckInOut, setGuests, setRooms } = homeSlice.actions;

export const selectDestination = (state: any) => state.home.destination;
export const selectCheckInOut = (state: any) => state.home.checkInOut;
export const selectGuests = (state: any) => state.home.guests;
export const selectRooms = (state: any) => state.home.rooms;

export default homeSlice.reducer;