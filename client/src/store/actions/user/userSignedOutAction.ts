import * as actionType from "../actionType";
import { ReduxAction } from "../../../interface/ReduxAction";

export const userSignedOut = (): ReduxAction<any> => ({
  type: actionType.user_signed_out,
  payload: undefined
});