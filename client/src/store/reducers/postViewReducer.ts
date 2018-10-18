import * as actionType from "../actions/actionType";
import { initial_SelectedPostState } from '../../store/initialState';
import { PostDocument } from "../../interface/PostData";
import { SelectedPostState } from "../../interface/SelectedPostState";
import { ReduxAction } from "../../interface/ReduxAction";
import { LoadingStatus } from "../../interface/LoadingStatus";

export const postViewReducer = (
  state: SelectedPostState,
  action: ReduxAction<string | PostDocument | undefined>
) => {
  state = state ? state : initial_SelectedPostState;
  switch (action.type) {
    case actionType.postview_set_status: {
      return handle_postpage_set_status(state, action);
    }
    case actionType.postview_loaded: {
      return handle_postpage_loaded(state, action);
    }
    case actionType.postview_error: {
      return handle_postpage_error(state, action);
    }
    default:
      return state;
  }
};

const handle_postpage_set_status = (
  state: SelectedPostState,
  action: ReduxAction<string | PostDocument | undefined>
): SelectedPostState => {
  return {
    ...state,
    loadingStatus: action.payload as LoadingStatus
  };
};

const handle_postpage_loaded = (
  state: SelectedPostState,
  action: ReduxAction<string | PostDocument | undefined>
): SelectedPostState => {
  return {
    ...state,
    loadingStatus: "loaded",
    post: action.payload as PostDocument
  };
};

const handle_postpage_error = (
  state: SelectedPostState,
  action: ReduxAction<string | PostDocument | undefined>
): SelectedPostState => {
  return {
    ...state,
    loadingStatus: "error",
    error: action.payload as string
  };
};
