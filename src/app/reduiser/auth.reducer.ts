import { createReducer, on, Action } from '@ngrx/store';
import { SignInAction, SignOutAction } from '../actions/auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
  user: any;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  user: {},
};

const authReducer = createReducer(
  initialState,
  on(SignInAction, (state, { payload }) => ({
    ...state,
    isLoggedIn: true,
    user: payload,
  })),
  on(SignOutAction, () => initialState)
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
