import {
  IAction,
  ILoadingStatus
} from "../../../interface";
import * as actionType from "../actionType";

export const postFormSetStatusAction = (
  status: ILoadingStatus
): IAction<ILoadingStatus> => ({
  type: actionType.postform_loading_status,
  payload: status
});