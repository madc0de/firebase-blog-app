import {
  IAction,
  IUser,
} from "../../../interface";
import * as actionType from "../actionType";

// user
export const userAuthenticatedAction = (
  user: IUser
): IAction<IUser> => ({
  type: actionType.user_authenticated,
  payload: user
});