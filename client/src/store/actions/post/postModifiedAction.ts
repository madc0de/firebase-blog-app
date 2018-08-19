import * as actionType from "../actionType";
import { PostDocument } from "../../../interface/PostData";
import { ReduxAction } from "../../../interface/ReduxAction";

export const postModifiedAction = (
  post: PostDocument
): ReduxAction<PostDocument> => ({
  type: actionType.post_modified,
  payload: post
});
