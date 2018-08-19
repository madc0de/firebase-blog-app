import { Dispatch } from "redux";
import * as Users from "../../../data/Users";
import { userLoadedAction } from "./userLoadedAction";
import { UserData } from "../../../interface/UserData";
import { GetStateFn } from "../../../interface/GetStateFn";

export const ensureUserAccount = (userId: string, userData: UserData): any => async (
  dispatch: Dispatch,
  getSate: GetStateFn
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
