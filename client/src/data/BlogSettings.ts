import { firestore } from "./firestore-init";
import { BlogSettingData } from "../interface/BlogSettingData";

export const getBlogSettings = async (): Promise<BlogSettingData | undefined> => {
  try {
    const ref = firestore.doc(`settings/blog`);
    const docSnapshot = await ref.get();
    if (docSnapshot.exists) {
      return docSnapshot.data() as BlogSettingData
    }
    return undefined;
  } catch (error) {
    return error;
  }
};
