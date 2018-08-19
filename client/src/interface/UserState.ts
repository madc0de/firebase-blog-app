import { UserData } from './UserData';
import { FirestoreDocument } from './FirestoreDocument';

export interface UsersState {
  users: FirestoreDocument<UserData>[];
}

