import {
  IAction,
  IPostBody,
} from "../../../interface";
import * as actionType from "../actionType";

export const postBodyLoadedAction  = (postBody: IPostBody): IAction<IPostBody>=> ({
  type: actionType.postbody_loaded,
  payload: postBody
});
