import * as actionType from "../actionType";
import { ReduxAction } from "../../../interface/ReduxAction";

// user
export const authErrorAction = (
  error: string
): ReduxAction<string> => {
    return ({
      type: actionType.auth_error,
      payload: error
    });
  };