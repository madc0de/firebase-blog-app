import { PostTitleDocument } from "../../../interface/PostTitleData";
import { ReduxAction } from "../../../interface/ReduxAction";
import { actionType } from "..";

export const postLoadedAction = (
  postTitleDoc: PostTitleDocument
): ReduxAction<PostTitleDocument> => ({
  type: actionType.posttitle_loaded,
  payload: postTitleDoc
});