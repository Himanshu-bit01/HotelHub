import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
}

const initialState: AccountState = {
  firstName: 'Arjun',
  lastName: 'Sharma',
  email: 'arjun.sharma@example.com',
  phone: '+91 9876543210',
  emailVerified: true,
  phoneVerified: false,
  twoFactorEnabled: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateProfile: (
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
      }>
    ) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },

    verifyEmail: state => {
      state.emailVerified = true;
    },

    verifyPhone: state => {
      state.phoneVerified = true;
    },

    toggleTwoFactor: state => {
      state.twoFactorEnabled = !state.twoFactorEnabled;
    },
  },
});

export const {
  updateProfile,
  verifyEmail,
  verifyPhone,
  toggleTwoFactor,
} = accountSlice.actions;

export default accountSlice.reducer;