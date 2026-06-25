export type FormState = {
  firstName: string;
  lastName: string;
  newEmail: string;
  newPhone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type FormAction =
  | { type: 'SET_FIRST_NAME'; payload: string }
  | { type: 'SET_LAST_NAME'; payload: string }
  | { type: 'SET_NEW_EMAIL'; payload: string }
  | { type: 'SET_NEW_PHONE'; payload: string }
  | { type: 'SET_CURRENT_PASSWORD'; payload: string }
  | { type: 'SET_NEW_PASSWORD'; payload: string }
  | { type: 'SET_CONFIRM_PASSWORD'; payload: string };

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIRST_NAME':
      return { ...state, firstName: action.payload };
    case 'SET_LAST_NAME':
      return { ...state, lastName: action.payload };
    case 'SET_NEW_EMAIL':
      return { ...state, newEmail: action.payload };
    case 'SET_NEW_PHONE':
      return { ...state, newPhone: action.payload };
    case 'SET_CURRENT_PASSWORD':
      return { ...state, currentPassword: action.payload };
    case 'SET_NEW_PASSWORD':
      return { ...state, newPassword: action.payload };
    case 'SET_CONFIRM_PASSWORD':
      return { ...state, confirmPassword: action.payload };
    default:
      return state;
  }
}
