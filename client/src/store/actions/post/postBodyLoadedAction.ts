import { ActionCreator } from "redux";
import {
  IAction,
  IPostBody,
} from "../../../interface";
import * as actionType from "../actionType";

export const postBodyLoadedAction: ActionCreator<IAction<IPostBody>> = (
  postBody: IPostBody
) => ({
  type: actionType.postbody_loaded,
  payload: postBody
});
