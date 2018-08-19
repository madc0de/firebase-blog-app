import * as actionType from "../actionType";
import { PostDocument } from "../../../interface/PostData";
import { ReduxAction } from "../../../interface/ReduxAction";

export const postFormSubmitSuccess = (
  post: PostDocument
): ReduxAction<PostDocument> => ({
  type: actionType.postform_submit_success,
  payload: post
});
