import { Action } from '@ngrx/store';
import { User } from 'src/app/model/user';

export enum AuthActionTypes {
  SignIn = '[Auth] Sign In',
  SignOut = '[Auth] Sign Out',
}

export class SignInAction implements Action {
  readonly type = AuthActionTypes.SignIn;
  constructor(public payload: User) {}
}

export class SignOutAction implements Action {
  readonly type = AuthActionTypes.SignOut;
}
