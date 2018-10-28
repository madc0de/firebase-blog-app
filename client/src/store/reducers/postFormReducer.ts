import * as actionType from "../actions/actionType";
import { initial_PostFormState } from "../../store/initialState";
import { PostDocument } from "../../interface/PostData";
import { PostFormState } from "../../interface/PostFormState";
import { ReduxAction } from "../../interface/ReduxAction";
import { PostFormValues } from "../../interface/PostFormValues";
import { LoadingStatus } from "../../interface/LoadingStatus";
import { mapUtil } from "src/utils";

export const postFormReducer = (
  state: PostFormState,
  action: ReduxAction<
    string | PostDocument | PostFormValues | LoadingStatus | undefined
  >
): PostFormState => {
  state = state ? state : initial_PostFormState;
  switch (action.type) {
    case actionType.postform_loading_status: {
      return handle_set_status(state, action as ReduxAction<LoadingStatus>);
    }
    case actionType.postform_values: {
      return handle_set_formValues(state, action as ReduxAction<
        PostFormValues
      >);
    }
    case actionType.postform_submit_start: {
      return handle_submit_start(state, action as ReduxAction<any>);
    }
    case actionType.postform_submit_success: {
      return handle_submit_success(state, action as ReduxAction<PostDocument>);
    }
    case actionType.postform_submit_error: {
      return handle_submit_error(state, action as ReduxAction<string>);
    }
    default:
      return state;
  }
};

const handle_set_status = (
  state: PostFormState,
  action: ReduxAction<LoadingStatus>
): PostFormState => {
  if (action.payload === "") {
    return { ...initial_PostFormState };
  }

  return {
    ...state,
    loadingStatus: action.payload as LoadingStatus
  };
};

const handle_set_formValues = (
  state: PostFormState,
  action: ReduxAction<PostFormValues>
): PostFormState => {
  const formValues = action.payload as PostFormValues;
  return {
    ...state,
    loadingStatus: "loaded",
    formValues,
    postId: formValues.postId
  };
};

const handle_submit_start = (
  state: PostFormState,
  action: ReduxAction<PostDocument>
): PostFormState => ({
  ...state,
  updatingStatus: "submitting"
});

const handle_submit_success = (
  state: PostFormState,
  action: ReduxAction<PostDocument>
): PostFormState => {
  const postId = mapUtil.getKey(action.payload)
  return {
    ...state,
    updatingStatus: "success",
    postId
  };
};

const handle_submit_error = (
  state: PostFormState,
  action: ReduxAction<string | undefined>
): PostFormState => {
  return {
    ...state,
    loadingStatus: "error",
    error: action.payload as string
  };
};
