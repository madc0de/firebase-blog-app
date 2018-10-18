import * as actionType from "../actionType";
import { LoadingStatus } from "../../../interface/LoadingStatus";
import { ReduxAction } from "../../../interface/ReduxAction";

export const postViewSetStatusAction = (
  status: LoadingStatus
): ReduxAction<LoadingStatus> => ({
  type: actionType.postview_set_status,
  payload: status
});
