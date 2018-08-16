import {
  IAction,
  ILoadingStatus
} from "../../../interface";
import * as actionType from "../actionType";

export const postViewSetStatusAction = (
  status: ILoadingStatus
): IAction<ILoadingStatus> => ({
  type: actionType.postview_set_status,
  payload: status
});