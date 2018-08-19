import * as actionType from "../actionType";
import { ReduxAction } from "../../../interface/ReduxAction";

export const postViewErrorAction = (error: string): ReduxAction<string> => ({
  type: actionType.postview_error,
  payload: error
});
