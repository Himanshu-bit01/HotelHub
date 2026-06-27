import { formReducer, FormState } from '../../src/screens/Profile/QuickActions/accountSettingsReducer';

const initialState: FormState = {
  firstName: '',
  lastName: '',
  newEmail: '',
  newPhone: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

describe('accountSettingsReducer', () => {
  it('should handle SET_FIRST_NAME', () => {
    const state = formReducer(initialState, { type: 'SET_FIRST_NAME', payload: 'Arjun' });
    expect(state.firstName).toBe('Arjun');
  });

  it('should handle SET_LAST_NAME', () => {
    const state = formReducer(initialState, { type: 'SET_LAST_NAME', payload: 'Sharma' });
    expect(state.lastName).toBe('Sharma');
  });

  it('should handle SET_NEW_EMAIL', () => {
    const state = formReducer(initialState, { type: 'SET_NEW_EMAIL', payload: 'test@example.com' });
    expect(state.newEmail).toBe('test@example.com');
  });

  it('should handle SET_NEW_PHONE', () => {
    const state = formReducer(initialState, { type: 'SET_NEW_PHONE', payload: '+91 1234567890' });
    expect(state.newPhone).toBe('+91 1234567890');
  });

  it('should handle SET_CURRENT_PASSWORD', () => {
    const state = formReducer(initialState, { type: 'SET_CURRENT_PASSWORD', payload: 'oldPass123' });
    expect(state.currentPassword).toBe('oldPass123');
  });

  it('should handle SET_NEW_PASSWORD', () => {
    const state = formReducer(initialState, { type: 'SET_NEW_PASSWORD', payload: 'newPass456' });
    expect(state.newPassword).toBe('newPass456');
  });

  it('should handle SET_CONFIRM_PASSWORD', () => {
    const state = formReducer(initialState, { type: 'SET_CONFIRM_PASSWORD', payload: 'newPass456' });
    expect(state.confirmPassword).toBe('newPass456');
  });

  it('should return current state for unknown action', () => {
    const state = formReducer(initialState, { type: 'UNKNOWN_ACTION' } as any);
    expect(state).toBe(initialState);
  });

  it('should not mutate original state (immutability check)', () => {
    const state = formReducer(initialState, { type: 'SET_FIRST_NAME', payload: 'Arjun' });
    expect(state).not.toBe(initialState);
    expect(initialState.firstName).toBe('');
  });

  it('should handle multiple sequential actions', () => {
    let state = formReducer(initialState, { type: 'SET_FIRST_NAME', payload: 'Arjun' });
    state = formReducer(state, { type: 'SET_LAST_NAME', payload: 'Sharma' });
    state = formReducer(state, { type: 'SET_NEW_EMAIL', payload: 'arjun@example.com' });
    state = formReducer(state, { type: 'SET_NEW_PHONE', payload: '+91 9876543210' });
    state = formReducer(state, { type: 'SET_CURRENT_PASSWORD', payload: 'oldPass' });
    state = formReducer(state, { type: 'SET_NEW_PASSWORD', payload: 'newPass' });
    state = formReducer(state, { type: 'SET_CONFIRM_PASSWORD', payload: 'newPass' });

    expect(state).toEqual({
      firstName: 'Arjun',
      lastName: 'Sharma',
      newEmail: 'arjun@example.com',
      newPhone: '+91 9876543210',
      currentPassword: 'oldPass',
      newPassword: 'newPass',
      confirmPassword: 'newPass',
    });
  });
});
