import { ActionCreator, } from "redux";
import {
  IAction,
  IUser,
} from "../../../interface";
import * as actionType from "../actionType";

// user
export const userAuthenticatedAction: ActionCreator<IAction<IUser>> = (
  user: IUser
) => ({
  type: actionType.user_authenticated,
  payload: user
});