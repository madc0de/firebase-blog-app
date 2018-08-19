import { Dispatch } from "redux";
import { IUserData, IGetState } from "../../../interface";
import * as Users from "../../../data/Users";
import { userLoadedAction } from "./userLoadedAction";

export const ensureUserAccount = (userId: string, userData: IUserData): any => async (
  dispatch: Dispatch,
  getSate: IGetState
) => {
  try {
    let user = await Users.getUser(userId as string);
    if (!user) {
      user = await Users.saveUser(userId as string, userData);
    }
    return dispatch(userLoadedAction(user));
  } catch (error) {
    return error;
  }
};
