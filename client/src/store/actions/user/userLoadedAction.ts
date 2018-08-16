import { IAction, IUser } from "../../../interface";
import * as actionType from "../actionType";

export const userLoadedAction = (user: IUser): IAction<IUser> => ({
  type: actionType.user_loaded,
  payload: user
});
