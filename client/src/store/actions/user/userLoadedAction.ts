import { ActionCreator, } from "redux";
import {
  IAction,
  IUser,
} from "../../../interface";
import * as actionType from "../actionType";

export const userAddedLoaded: ActionCreator<IAction<IUser>> = (
  user: IUser
) => ({
  type: actionType.user_loaded,
  payload: user
});
