import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GuestForm {
  fullName: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  specialRequests: string;
}

export interface BookingState {
  hotelId: number | null;
  selectedRoomId: number | null;
  guestForm: GuestForm;
  paymentMethod: string;
}

const initialState: BookingState = {
  hotelId: null,
  selectedRoomId: null,
  guestForm: {
    fullName: '',
    email: '',
    phone: '',
    adults: 2,
    children: 0,
    specialRequests: '',
  },
  paymentMethod: '1',
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingHotelId(state, action: PayloadAction<number>) {
      state.hotelId = action.payload;
    },
    setSelectedRoom(state, action: PayloadAction<number>) {
      state.selectedRoomId = action.payload;
    },
    setGuestField(state, action: PayloadAction<{ field: keyof GuestForm; value: string }>) {
      (state.guestForm as any)[action.payload.field] = action.payload.value;
    },
    incrementGuest(state, action: PayloadAction<'adults' | 'children'>) {
      state.guestForm[action.payload] += 1;
    },
    decrementGuest(state, action: PayloadAction<'adults' | 'children'>) {
      const field = action.payload;
      if (field === 'adults' && state.guestForm.adults <= 1) return;
      if (field === 'children' && state.guestForm.children <= 0) return;
      state.guestForm[field] -= 1;
    },
    setPaymentMethod(state, action: PayloadAction<string>) {
      state.paymentMethod = action.payload;
    },
    resetBooking() {
      return initialState;
    },
  },
});

export const {
  setBookingHotelId,
  setSelectedRoom,
  setGuestField,
  incrementGuest,
  decrementGuest,
  setPaymentMethod,
  resetBooking,
} = bookingSlice.actions;

export const selectSelectedRoomId = (state: any) => state.booking.selectedRoomId;
export const selectGuestForm = (state: any) => state.booking.guestForm;
export const selectPaymentMethod = (state: any) => state.booking.paymentMethod;

export default bookingSlice.reducer;
