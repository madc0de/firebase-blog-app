// import * as firebase from "firebase/app";
import { firestore } from "./firestore-init";
import * as mapUtil from "../utils/mapUtil";
import { BlogMetaData } from "../interface/BlogMetaData";

export const getMetadata = async (): Promise<BlogMetaData | undefined> => {
  try {
    const snapshot = await firestore.doc(`metadata/values`).get();
    if (snapshot.exists) {
      return mapUtil.snapshotToMap(snapshot) as BlogMetaData;
    }
    return undefined;
  } catch (error) {
    return error;
  }
};
