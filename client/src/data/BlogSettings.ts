import { IBlogSettings } from "../interface";
import { firestore } from "./firestore-init";

export const getBlogSettings = async (): Promise<IBlogSettings | undefined> => {
  try {
    const ref = firestore.doc(`settings/blog`);
    const docSnapshot = await ref.get();
    if (docSnapshot.exists) {
      return docSnapshot.data() as IBlogSettings
    }
    return undefined;
  } catch (error) {
    return error;
  }
};
