import { Dispatch, } from "redux";
import { BlogSettings } from "../../../data";
import { blogSettingsLoadedAction } from "./blogSettingsLoadedAction";
import { GetStateFn } from "../../../interface/GetStateFn";
import { BlogSettingData } from "../../../interface/BlogSettingData";

export const loadBlogSettingsAction = (): any => async (
  dispatch: Dispatch,
  getState: GetStateFn
) => {
  try {
    const blogSettings = await BlogSettings.getBlogSettings() as BlogSettingData
    return dispatch(blogSettingsLoadedAction(blogSettings));
  } catch (error) {
    return error;
  }
};
