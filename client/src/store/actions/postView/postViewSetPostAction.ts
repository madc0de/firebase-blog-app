import {
  IAction,
  IPost,
} from "../../../interface";
import * as actionType from "../actionType";

export const postViewSetPostAction = (post: IPost): IAction<IPost> => ({
  type: actionType.postview_loaded,
  payload: post
});