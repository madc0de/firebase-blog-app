import * as actionType from "../actionType";
import { PostBodyData } from "../../../interface/PostBodyData";
import { ReduxAction } from "../../../interface/ReduxAction";

export const postBodyLoadedAction  = (postBody: PostBodyData): ReduxAction<PostBodyData>=> ({
  type: actionType.postbody_loaded,
  payload: postBody
});
