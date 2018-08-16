import * as firebase from "firebase/app";
import { firestore } from "./firestore-init";
import * as mapUtil from "../utils/mapUtil";
import { IUser, IUserData } from "../interface";

export const getUser = async (userId: string) => {
  try {
    const snapshot = await firestore.doc(`users/${userId}`).get();
    return mapUtil.snapshotToMap(snapshot) as IUser;
  } catch (error) {
    return error;
  }
};

export const saveUser = async (userId: string | undefined, userData: IUserData) => {
  try {
    if (userId) {
      return updateUser(userId, userData);    
    }
    return addUser(userData)
  } catch (error) {
    return error;
  }
};

export const addUser = async (userData: IUserData): Promise<IUser> => {
  const docRef = await firestore.collection("users").add(userData);
  return getUserByDocRef(docRef);
};

export const updateUser = async (userId: string, userData: IUserData) => {
  let ref = await firestore.doc(`users/${userId}`);
  await ref.set(userData, { merge: true });
  return getUserByDocRef(ref);
};

const getUserByDocRef = async (ref: firebase.firestore.DocumentReference) => {
  const docSnap = await ref.get();
  return mapUtil.snapshotToMap(docSnap) as IUser;
};
