import * as actionType from "../actionType";
import { ReduxAction } from "../../../interface/ReduxAction";
import { BlogSettingData } from "../../../interface/BlogSettingData";

export const blogSettingsLoadedAction = (
  blogSettings: BlogSettingData
): ReduxAction<BlogSettingData> => ({
  type: actionType.blogsetting_loaded,
  payload: blogSettings
});
