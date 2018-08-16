import { Dispatch } from "redux";
import { IUserData, IGetState } from "../../../interface";
import * as Users from "../../../data/Users";
import { userLoadedAction } from "./userLoadedAction";

export const ensureUserAccount = (userData: IUserData): any => async (
  dispatch: Dispatch,
  getSate: IGetState
) => {
  try {
    let user = await Users.getUser(userData.uid as string);
    if (!user) {
      user = await Users.saveUser(userData.uid as string, userData);
    }
    return dispatch(userLoadedAction(user));
  } catch (error) {
    return error;
  }
};
