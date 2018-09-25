import * as actionType from "../actionType";
import { LoadingStatus } from "../../../interface/LoadingStatus";
import { ReduxAction } from "../../../interface/ReduxAction";

export const postViewSetStatusAction = (
  status: LoadingStatus
): ReduxAction<LoadingStatus> => ({
  type: actionType.postview_set_status,
  payload: status
});

export const postViewSetSlugOrId = (slugOrId: string): ReduxAction<string> => ({
  type: actionType.postview_set_slugOrId,
  payload: slugOrId
})