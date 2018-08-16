import {
  IPost,
  IAction,
} from "../../../interface";
import * as actionType from "../actionType";

export const postFormSubmitSuccess = (
  post: IPost
): IAction<IPost> => ({
  type: actionType.postform_submit_success,
  payload: post
});
