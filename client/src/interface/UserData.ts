import { FirestoreDocument } from './FirestoreDocument';

export type UserRole = "admin" | "contributor";
export interface Role {
  [rolename: string]: boolean;
}

export interface UserData {
  email: string;
  displayName: string;
  photoUrl: string;
  roles: Role;
}

export type UserDocument = FirestoreDocument<UserData>