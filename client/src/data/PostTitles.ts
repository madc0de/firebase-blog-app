import { firestore } from "./firestore-init";
import * as mapUtil from "../utils/mapUtil";
import { PostTitleDocument } from "../interface/PostTitleData";

export const getPostTitles = async (
  userId: string
): Promise<PostTitleDocument[]> => {
  try {
    const querySnap = await firestore
      .collection("posttitle")
      .where("userId", "==", userId)
      .get();
    if (querySnap.size > 0) {
      return querySnap.docs.map(
        doc => mapUtil.snapshotToMap(doc) as PostTitleDocument
      );
    }
    return [];
  } catch (error) {
    console.log(error)
    return error;
  }
};
