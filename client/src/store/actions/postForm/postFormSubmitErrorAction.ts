import * as actionType from "../actionType";
import { ReduxAction } from "../../../interface/ReduxAction";

export const postFormSubmitError = (
  error: string
): ReduxAction<string> => ({
  type: actionType.postform_submit_error,
  payload: error
});
