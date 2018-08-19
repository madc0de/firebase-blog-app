import * as firebase from "firebase/app";
import { firestore } from "./firestore-init";
import * as mapUtil from "../utils/mapUtil";
import { UserDocument, UserData } from "../interface/UserData";

export const getUser = async (userId: string): Promise<UserDocument | undefined> => {
  try {
    const snapshot = await firestore.doc(`users/${userId}`).get();
    if (snapshot.exists) {
      return mapUtil.snapshotToMap(snapshot) as UserDocument;
    }
    return undefined;
  } catch (error) {
    return error;
  }
};

export const saveUser = async (userId: string, userData: UserData): Promise<UserDocument> => {
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
): Promise<UserDocument> => {
  const docSnap = await ref.get();
  return mapUtil.snapshotToMap(docSnap) as UserDocument;
};
