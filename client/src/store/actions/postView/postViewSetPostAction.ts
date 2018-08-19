import * as actionType from "../actionType";
import { PostDocument } from "../../../interface/PostData";
import { ReduxAction } from "../../../interface/ReduxAction";

export const postViewSetPostAction = (post: PostDocument): ReduxAction<PostDocument> => ({
  type: actionType.postview_loaded,
  payload: post
});