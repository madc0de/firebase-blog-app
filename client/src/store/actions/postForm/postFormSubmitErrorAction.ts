import {
  IAction,
} from "../../../interface";
import * as actionType from "../actionType";

export const postFormSubmitError = (
  error: string
): IAction<string> => ({
  type: actionType.postform_submit_error,
  payload: error
});
