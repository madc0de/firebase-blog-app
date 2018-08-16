import { ActionCreator } from "redux";
import {
  IAction,
  IPost,
} from "../../../interface";
import * as actionType from "../actionType";

export const postModifiedAction: ActionCreator<IAction<IPost>> = (
  post: IPost
) => ({
  type: actionType.post_modified,
  payload: post
});
