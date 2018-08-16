import {
  IAction,
} from "../../../interface";
import * as actionType from "../actionType";

export const postFormSubmitStart = (): IAction<any> => ({
  type: actionType.postform_submit_start,
  payload: undefined
});
