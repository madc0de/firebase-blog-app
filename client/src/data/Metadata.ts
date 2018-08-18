// import * as firebase from "firebase/app";
import { firestore } from "./firestore-init";
import * as mapUtil from "../utils/mapUtil";
import { IMetaData } from "../interface";

export const getMetadata = async (): Promise<IMetaData | undefined> => {
  try {
    const snapshot = await firestore.doc(`metadata/values`).get();
    if (snapshot.exists) {
      return mapUtil.snapshotToMap(snapshot) as IMetaData;
    }
    return undefined;
  } catch (error) {
    return error;
  }
};
