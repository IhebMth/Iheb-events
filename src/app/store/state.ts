import { User } from '../model/user';

export interface AppState {
  auth: AuthState;
  // Add other state properties/entities as needed
}

export interface AuthState {
  loggedIn: boolean;
  user: User | null;
  // Add other authentication-related properties as needed
}
