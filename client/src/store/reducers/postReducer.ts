import { initial_PostsState } from "../../store/initialState";
import * as actionType from "../actions/actionType";
import * as mapUtil from "../../utils/mapUtil";
import { PostDocument, PostData } from "../../interface/PostData";
import { PostsState } from "../../interface/PostState";
import { PostBodyData } from "../../interface/PostBodyData";
import { ReduxAction } from "../../interface/ReduxAction";

type PostPayload = PostDocument | PostDocument[] | PostBodyData | string

export const postReducer = (
  state: PostsState,
  action: ReduxAction<PostPayload>
) => {
  state = state ? state : initial_PostsState;

  switch (action.type) {
    case actionType.post_loaded:
    case actionType.post_modified:
    case actionType.postform_submit_success: {
      return handle_post_loaded(state, action.payload as PostDocument);
    }
    case actionType.posts_loaded: {
      return handle_posts_loaded(state, action.payload as PostDocument[]);
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
  action: ReduxAction<PostPayload>,
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

const handle_posts_loaded = (
  postsState: PostsState,
  loadedPosts: PostDocument[]
): PostsState => {

  let currentPosts = [...postsState.posts]
  for(let post of loadedPosts) {
    const postId = mapUtil.getKey(post);
    const index = currentPosts.findIndex(
      docPost => mapUtil.getKey(docPost) === postId
    );
    if (index < 0) {
      currentPosts.push(post)
    } else {
      currentPosts.splice(index, 1, post)
    }
  }

  return {
    ...postsState,
    posts: currentPosts
  };
};

export default postReducer;
