import {
  IPostsState,
  IPost,
  IPostBody,
  IAction,
  IPostData
} from "../../interface";
import { initial_PostsState } from "../../store/initialState";
import * as actionType from "../actions/actionType";
import * as mapUtil from "../../utils/mapUtil";

export const postReducer = (
  state: IPostsState,
  action: IAction<IPost | IPostBody | string>
) => {
  state = state ? state : initial_PostsState;

  switch (action.type) {
    case actionType.post_loaded:
    case actionType.post_modified:
    case actionType.postform_submit_success: {
      return handle_post_loaded(state, action.payload as IPost);
    }
    case actionType.postbody_loaded: {
      return handle_postbody_loaded(state, action.payload as IPostBody);
    }
    case actionType.post_removed: {
      return handle_post_removed(action, state);
    }
    default:
      return state;
  }
};

const handle_post_removed = (
  action: IAction<string | IPost | IPostBody>,
  state: IPostsState
) => {
  const postId = action.payload as string;
  const index = state.posts.findIndex(
    post => mapUtil.getMapKey(post) === postId
  );
  return {
    ...state,
    posts: [...state.posts.slice(0, index), ...state.posts.slice(index + 1)]
  };
};

const handle_postbody_loaded = (
  postsState: IPostsState,
  postBody: IPostBody
) => {
  const index = postsState.posts.findIndex(
    docPost => mapUtil.getMapKey(docPost) === postBody.postId
  );
  if (index >= 0) {
    const post = postsState.posts[index];
    const postData = mapUtil.getMapValue(post) as IPostData;
    postData.body = postBody.body;
  }
  return postsState;
};

const handle_post_loaded = (
  postsState: IPostsState,
  post: IPost
): IPostsState => {
  const postId = mapUtil.getMapKey(post);
  const index = postsState.posts.findIndex(
    docPost => mapUtil.getMapKey(docPost) === postId
  );
  let posts: IPost[] = [];
  if (index < 0) {
    posts = [...postsState.posts, post];
  } else {
    posts = [
      ...postsState.posts.slice(0, index),
      post,
      ...postsState.posts.slice(index + 1)
    ];
  }

  return {
    ...postsState,
    posts
  };
};

export default postReducer;
