import * as firebase from "firebase/app";
import { firestore } from "./firestore-init";
import * as mapUtil from "../utils/mapUtil";
import { IUser, IUserData } from "../interface";

export const getUser = async (userId: string): Promise<IUser | undefined> => {
  try {
    const snapshot = await firestore.doc(`users/${userId}`).get();
    if (snapshot.exists) {
      return mapUtil.snapshotToMap(snapshot) as IUser;
    }
    return undefined;
  } catch (error) {
    return error;
  }
};

export const saveUser = async (userId: string, userData: IUserData): Promise<IUser> => {
  try {
    const ref = await firestore.doc(`users/${userId}`);
    await ref.set(userData, { merge: true });
    const user = await getUserByDocRef(ref);
    return user
  } catch (error) {
    return error;
  }
};

const getUserByDocRef = async (
  ref: firebase.firestore.DocumentReference
): Promise<IUser> => {
  const docSnap = await ref.get();
  return mapUtil.snapshotToMap(docSnap) as IUser;
};
