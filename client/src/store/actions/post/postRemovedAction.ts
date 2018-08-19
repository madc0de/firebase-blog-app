import * as actionType from "../actionType";
import { ReduxAction } from "../../../interface/ReduxAction";
import { PostDocument } from "../../../interface/PostData";

export const postRemovedAction = (
  postId: string
): ReduxAction<PostDocument | string> => ({
  type: actionType.post_removed,
  payload: postId
});
