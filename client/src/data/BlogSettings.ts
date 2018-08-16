import { IBlogSetting } from "../interface";
import { firestore } from "./firestore-init";

export const getBlogSettings = async (): Promise<IBlogSetting | undefined> => {
  try {
    const ref = firestore.doc(`settings/blog`);
    const docSnapshot = await ref.get();
    if (docSnapshot.exists) {
      return docSnapshot.data() as IBlogSetting
    }
    return undefined;
  } catch (error) {
    return error;
  }
};
