import { firestore } from "./firestore-init";
import * as mapUtil from "../utils/mapUtil";
import { PostDocument } from "../interface/PostData";

export const getAllUserPosts = async (
  userId: string
): Promise<PostDocument[]> => {
  try {
    const querySnap = await firestore
      .collection("posttitle")
      .where("userId", "==", userId)
      .get();
    if (querySnap.size > 0) {
      return querySnap.docs.map(
        doc => mapUtil.snapshotToMap(doc) as PostDocument
      );
    }
    return [];
  } catch (error) {
    console.log(error)
    return error;
  }
};
