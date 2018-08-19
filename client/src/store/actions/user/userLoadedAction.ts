import * as actionType from "../actionType";
import { UserDocument } from "../../../interface/UserData";
import { ReduxAction } from "src/interface/ReduxAction";

export const userLoadedAction = (user: UserDocument): ReduxAction<UserDocument> => ({
  type: actionType.user_loaded,
  payload: user
});
