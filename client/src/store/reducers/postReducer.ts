import { initial_PostsState } from "../../store/initialState";
import * as actionType from "../actions/actionType";
import * as mapUtil from "../../utils/mapUtil";
import { PostDocument, PostData } from "../../interface/PostData";
import { PostsState } from "../../interface/PostState";
import { PostBodyData } from "../../interface/PostBodyData";
import { ReduxAction } from "../../interface/ReduxAction";

export const postReducer = (
  state: PostsState,
  action: ReduxAction<PostDocument | PostBodyData | string>
) => {
  state = state ? state : initial_PostsState;

  switch (action.type) {
    case actionType.post_loaded:
    case actionType.post_modified:
    case actionType.postform_submit_success: {
      return handle_post_loaded(state, action.payload as PostDocument);
    }
    case actionType.postbody_loaded: {
      return handle_postbody_loaded(state, action.payload as PostBodyData);
    }
    case actionType.post_removed: {
      return handle_post_removed(action, state);
    }
    default:
      return state;
  }
};

const handle_post_removed = (
  action: ReduxAction<string | PostDocument | PostBodyData>,
  state: PostsState
) => {
  const postId = action.payload as string;
  const index = state.posts.findIndex(
    post => mapUtil.getKey(post) === postId
  );
  return {
    ...state,
    posts: [...state.posts.slice(0, index), ...state.posts.slice(index + 1)]
  };
};

const handle_postbody_loaded = (
  postsState: PostsState,
  postBody: PostBodyData
) => {
  const index = postsState.posts.findIndex(
    docPost => mapUtil.getKey(docPost) === postBody.postId
  );
  if (index >= 0) {
    const post = postsState.posts[index];
    const postData = mapUtil.getValue(post) as PostData;
    postData.body = postBody.body;
  }
  return postsState;
};

const handle_post_loaded = (
  postsState: PostsState,
  post: PostDocument
): PostsState => {
  const postId = mapUtil.getKey(post);
  const index = postsState.posts.findIndex(
    docPost => mapUtil.getKey(docPost) === postId
  );
  let posts: PostDocument[] = [];
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
