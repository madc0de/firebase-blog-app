// import * as firebase from "firebase/app";
import { firestore } from "./firestore-init";
import { BlogMetaData } from "../interface/BlogMetaData";

export const getMetadata = async (): Promise<BlogMetaData | undefined> => {
  try {
    const snapshot = await firestore.doc(`metadata/values`).get();
    if (snapshot.exists) {
      return snapshot.data() as BlogMetaData;
    }
    return undefined;
  } catch (error) {
    return error;
  }
};
