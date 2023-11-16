import { createAction, props } from '@ngrx/store';

export const SignInAction = createAction(
  '[Auth] Sign In',
  props<{ payload: any }>()
);

export const SignOutAction = createAction('[Auth] Sign Out');

export const AddNotification = createAction(
  '[Notification] Add Notification',
  props<{ payload: any }>()
);
