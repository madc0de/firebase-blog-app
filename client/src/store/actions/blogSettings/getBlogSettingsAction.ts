import { Dispatch } from "redux";
import { BlogSettings } from "../../../data";
import { blogSettingsLoadedAction } from "./blogSettingsLoadedAction";
import { IGetState } from "../../../interface";

export const asyncGetBlogSettingsAction = () => async (
  dispatch: Dispatch,
  getState: IGetState
) => {
  try {
    const blogSettings = await BlogSettings.getBlogSettings();
    return dispatch(blogSettingsLoadedAction(blogSettings));
  } catch (error) {
    return error;
  }
};
