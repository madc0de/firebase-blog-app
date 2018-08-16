import { ActionCreator, } from "redux";
import {
  IAction,
} from "../../../interface";
import * as actionType from "../actionType";

export const userSignedOut: ActionCreator<IAction<any>> = () => ({
  type: actionType.user_signed_out,
  payload: undefined
});