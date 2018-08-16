import {
  IAction,
} from "../../../interface";
import * as actionType from "../actionType";

export const postViewErrorAction = (error: string): IAction<string> => ({
  type: actionType.postview_error,
  payload: error
});
