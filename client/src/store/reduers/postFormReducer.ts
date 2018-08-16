import * as actionType from '../actions/actionType';
import {
  IAction,
  IPost,
  IPostFormState,
  ILoadingStatus,
  IPostFormValues
} from '../../interface';
import { initial_PostFormState } from '../../store/initialState';
import { getMapKey } from '../../utils/mapUtil';

const reducer = (
  state: IPostFormState,
  action: IAction<string | IPost | IPostFormValues | string | undefined>
): IPostFormState => {
  state = state ? state : initial_PostFormState;
  switch (action.type) {
    case actionType.postform_loading_status: {
      return handle_set_status(state, action as IAction<string>);
    }
    case actionType.postform_values: {
      return handle_set_formValues(state, action as IAction<IPostFormValues>);
    }
    case actionType.postform_submit_start: {
      return handle_submit_start(state, action as IAction<any>);
    }
    case actionType.postform_submit_success: {
      return handle_submit_success(state, action as IAction<IPost>);
    }
    case actionType.postform_submit_error: {
      return handle_submit_error(state, action as IAction<string>);
    }
    default:
      return state;
  }
};

export default reducer;

const handle_set_status = (
  state: IPostFormState,
  action: IAction<string | IPost | undefined>
): IPostFormState => {
  return {
    ...state,
    loadingStatus: action.payload as ILoadingStatus
  };
};

const handle_set_formValues = (
  state: IPostFormState,
  action: IAction<IPostFormValues>
): IPostFormState => ({
  ...state,
  loadingStatus: 'loaded',
  formValues: action.payload as IPostFormValues
});

const handle_submit_start = (
  state: IPostFormState,
  action: IAction<IPost>
): IPostFormState => ({
  ...state,
  submitStatus: 'started',
});


const handle_submit_success = (
  state: IPostFormState,
  action: IAction<IPost>
): IPostFormState => ({
  ...state,
  submitStatus: 'saved',
  postId: getMapKey(action.payload)
});

const handle_submit_error = (
  state: IPostFormState,
  action: IAction<string | undefined>
): IPostFormState => {
  return {
    ...state,
    loadingStatus: 'error',
    error: action.payload as string
  };
};
