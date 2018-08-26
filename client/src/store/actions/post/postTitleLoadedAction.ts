import { PostTitleDocument } from "../../../interface/PostTitleData";
import { ReduxAction } from "../../../interface/ReduxAction";
import { PostDocument } from "../../../interface/PostData";
import { actionType } from "..";

export const postLoadedAction = (
  postTitleDoc: PostTitleDocument
): ReduxAction<PostDocument> => ({
  type: actionType.posttitle_loaded,
  payload: postTitleDoc
});