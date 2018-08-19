import * as actionType from "../actionType";
import { LoadingStatus } from "../../../interface/LoadingStatus";
import { ReduxAction } from "../../../interface/ReduxAction";

export const postFormSetStatusAction = (
  status: LoadingStatus
): ReduxAction<LoadingStatus> => ({
  type: actionType.postform_loading_status,
  payload: status
});