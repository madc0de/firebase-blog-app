import * as actionType from "../actions/actionType";
import {
  IAction,
  IPost,
  IPostViewState,
  ILoadingStatus
} from "../../interface";
import { initial_PostViewState } from '../../store/initialState';

export const postViewReducer = (
  state: IPostViewState,
  action: IAction<string | IPost | undefined>
) => {
  state = state ? state : initial_PostViewState;
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
  state: IPostViewState,
  action: IAction<string | IPost | undefined>
): IPostViewState => {
  return {
    ...state,
    loadingStatus: action.payload as ILoadingStatus
  };
};

const handle_postpage_loaded = (
  state: IPostViewState,
  action: IAction<string | IPost | undefined>
): IPostViewState => {
  return {
    ...state,
    loadingStatus: "loaded",
    post: action.payload as IPost
  };
};

const handle_postpage_error = (
  state: IPostViewState,
  action: IAction<string | IPost | undefined>
): IPostViewState => {
  return {
    ...state,
    loadingStatus: "error",
    error: action.payload as string
  };
};
