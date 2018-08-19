import * as actionType from "../actionType";
import { ReduxAction } from "../../../interface/ReduxAction";

export const postFormSubmitStart = (): ReduxAction<any> => ({
  type: actionType.postform_submit_start,
  payload: undefined
});
