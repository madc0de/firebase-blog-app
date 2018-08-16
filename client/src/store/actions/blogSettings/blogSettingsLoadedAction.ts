import { ActionCreator } from "redux";
import {
  IAction,
  IBlogSettings,
} from "../../../interface";
import * as actionType from "../actionType";

export const blogSettingsLoadedAction: ActionCreator<IAction<IBlogSettings>> = (
  blogSettings: IBlogSettings
) => ({
  type: actionType.blogsetting_loaded,
  payload: blogSettings
});
