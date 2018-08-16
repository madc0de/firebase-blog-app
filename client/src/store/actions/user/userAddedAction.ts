import { ActionCreator, } from "redux";
import {
  IAction,
  IUser,
} from "../../../interface";
import * as actionType from "../actionType";

export const userAddedAction: ActionCreator<IAction<IUser>> = (
  user: IUser
) => ({
  type: actionType.user_added,
  payload: user
});
