import { UserData } from './UserData';

export interface AuthState {
  authenticated: boolean;
  isAdmin: boolean;
  authUserId: string;
  authUserData: UserData;
}
