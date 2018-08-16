import {
  IAction,
  IPostFormValues
} from "../../../interface";
import * as actionType from "../actionType";

export const postFormSetValuesAction = (
  postFormVAlues: IPostFormValues
): IAction<IPostFormValues> => ({
  type: actionType.postform_values,
  payload: postFormVAlues
});