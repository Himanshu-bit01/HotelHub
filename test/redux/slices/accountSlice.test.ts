import reducer, {
  updateProfile,
  verifyEmail,
  verifyPhone,
  toggleTwoFactor,
} from '../../../src/redux/store/slices/accountSlice';

const initialState = {
  firstName: 'Arjun',
  lastName: 'Sharma',
  email: 'arjun.sharma@example.com',
  phone: '+91 9876543210',
  emailVerified: true,
  phoneVerified: false,
  twoFactorEnabled: false,
};

describe('accountSlice', () => {
  describe('reducer', () => {
    it('should return the initial state when called with undefined action', () => {
      const state = reducer(undefined, { type: '@@INIT' } as any);
      expect(state).toEqual(initialState);
    });

    it('should handle updateProfile with new firstName and lastName', () => {
      const state = reducer(
        initialState,
        updateProfile({ firstName: 'Priya', lastName: 'Patel' })
      );
      expect(state.firstName).toBe('Priya');
      expect(state.lastName).toBe('Patel');
    });

    it('should handle verifyEmail and set emailVerified to true', () => {
      const state = reducer(
        { ...initialState, emailVerified: false },
        verifyEmail()
      );
      expect(state.emailVerified).toBe(true);
    });

    it('should handle verifyPhone and set phoneVerified to true', () => {
      expect(initialState.phoneVerified).toBe(false);
      const state = reducer(initialState, verifyPhone());
      expect(state.phoneVerified).toBe(true);
    });

    it('should handle toggleTwoFactor from false to true', () => {
      expect(initialState.twoFactorEnabled).toBe(false);
      const state = reducer(initialState, toggleTwoFactor());
      expect(state.twoFactorEnabled).toBe(true);
    });

    it('should handle toggleTwoFactor from true to false (toggle behavior)', () => {
      const enabledState = { ...initialState, twoFactorEnabled: true };
      const state = reducer(enabledState, toggleTwoFactor());
      expect(state.twoFactorEnabled).toBe(false);
    });

    it('should not modify other fields when updating profile', () => {
      const state = reducer(
        initialState,
        updateProfile({ firstName: 'Priya', lastName: 'Patel' })
      );
      expect(state.email).toBe(initialState.email);
      expect(state.phone).toBe(initialState.phone);
      expect(state.emailVerified).toBe(initialState.emailVerified);
      expect(state.phoneVerified).toBe(initialState.phoneVerified);
      expect(state.twoFactorEnabled).toBe(initialState.twoFactorEnabled);
    });
  });
});
