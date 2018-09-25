import * as actionType from "../actions/actionType";
import { initial_PostViewState } from '../../store/initialState';
import { PostDocument } from "../../interface/PostData";
import { PostViewState } from "../../interface/PostViewState";
import { ReduxAction } from "../../interface/ReduxAction";
import { LoadingStatus } from "../../interface/LoadingStatus";

export const postViewReducer = (
  state: PostViewState,
  action: ReduxAction<string | PostDocument | undefined>
) => {
  state = state ? state : initial_PostViewState;
  switch (action.type) {
    case actionType.postview_set_slugOrId: {
      return handle_postpage_set_slugOrId(state, action);
    }
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

const handle_postpage_set_slugOrId = (
  state: PostViewState,
  action: ReduxAction<string | PostDocument | undefined>
): PostViewState => {
  const slugOrID = action.payload as string
  if (slugOrID === state.slugOrID) {
    return state
  }

  return {
    ...state,
    slugOrID,
    loadingStatus: 'init'
  };
};

const handle_postpage_set_status = (
  state: PostViewState,
  action: ReduxAction<string | PostDocument | undefined>
): PostViewState => {
  return {
    ...state,
    loadingStatus: action.payload as LoadingStatus
  };
};

const handle_postpage_loaded = (
  state: PostViewState,
  action: ReduxAction<string | PostDocument | undefined>
): PostViewState => {
  return {
    ...state,
    loadingStatus: "loaded",
    post: action.payload as PostDocument
  };
};

const handle_postpage_error = (
  state: PostViewState,
  action: ReduxAction<string | PostDocument | undefined>
): PostViewState => {
  return {
    ...state,
    loadingStatus: "error",
    error: action.payload as string
  };
};
