import * as actionType from "../actions/actionType";
import { initail_BlogSetting } from "../initialState";
import { BlogSettingData } from "../../interface/BlogSettingData";
import { ReduxAction } from "../../interface/ReduxAction";

export const blogSettingsReducer = (
  state: BlogSettingData = initail_BlogSetting,
  action: ReduxAction<BlogSettingData>
): BlogSettingData => {
  switch (action.type) {
    case actionType.blogsetting_loaded: {
      return {
        ...state,
        ...action.payload,
        loaded: true
      };
    }
    default:
      return state;
  }
};