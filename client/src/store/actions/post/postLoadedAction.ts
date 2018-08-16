import { ActionCreator } from "redux";
import {
  IAction,
  IPost,
} from "../../../interface";
import * as actionType from "../actionType";

export const postLoadedAction: ActionCreator<IAction<IPost>> = (
  post: IPost
) => ({
  type: actionType.post_loaded,
  payload: post
});