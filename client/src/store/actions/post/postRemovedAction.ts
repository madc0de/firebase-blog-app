import { ActionCreator } from "redux";
import {
  IAction,
  IPost,
} from "../../../interface";
import * as actionType from "../actionType";

export const postRemovedAction: ActionCreator<IAction<IPost | string>> = (
  postId: string
) => ({
  type: actionType.post_removed,
  payload: postId
});
