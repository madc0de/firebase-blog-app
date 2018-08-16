import { ActionCreator } from "redux";
import {
  IAction,
  IBlogSetting,
} from "../../../interface";
import * as actionType from "../actionType";

export const blogSettingsLoadedAction: ActionCreator<IAction<IBlogSetting>> = (
  blogSettings: IBlogSetting
) => ({
  type: actionType.blogsetting_loaded,
  payload: blogSettings
});
