import * as actionType from "../actionType";
import { UserDocument } from "../../../interface/UserData";
import { ReduxAction } from "../../../interface/ReduxAction";

// user
export const userAuthenticatedAction = (
  user: UserDocument
): ReduxAction<UserDocument> => {
    return ({
      type: actionType.user_authenticated,
      payload: user
    });
  };