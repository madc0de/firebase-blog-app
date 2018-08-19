import * as actionType from "../actionType";
import { ReduxAction } from "../../../interface/ReduxAction";
import { PostFormValues } from "../../../interface/PostFormValues";

export const postFormSetValuesAction = (
  postFormVAlues: PostFormValues
): ReduxAction<PostFormValues> => ({
  type: actionType.postform_values,
  payload: postFormVAlues
});