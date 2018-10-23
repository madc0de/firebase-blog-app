import {
  postLoadedAction,
  postBodyLoadedAction,  
 } from '../post'
 import {
  postViewSetPostAction,
  postViewSetStatusAction,
  postViewErrorAction
 } from '../postView'
import {  Dispatch } from "redux";
import { getKey, getValue } from "../../../utils/mapUtil";
import { Posts } from '../../../data';
import { GetStateFn } from '../../../interface/GetStateFn';
import { PostDocument, PostData } from '../../../interface/PostData';


export const loadPosttAction = (slugOrId: string) => async (
  dispatch: Dispatch,
  getState: GetStateFn
) => {
  try {
    dispatch(postViewSetStatusAction("loading"));

    let post: PostDocument | undefined = getState().postsState.posts.find(post => {
      let postId = getKey(post);
      let slug = (getValue(post) as PostData).slug;
      return slugOrId === postId || slugOrId === slug;
    });

    if (!post) {
      post = await Posts.getPostById(slugOrId);
      if (!post) {
        post = await Posts.getPostBySlug(slugOrId);
      }
      if (post) {
        dispatch(postLoadedAction(post));
      }
    }

    if (post) {
      const postId = getKey(post);
      const postData = getValue(post) as PostData;

      if (!postData.body) {
        const body = await Posts.getPostBody(postId) as string;
        if (body) {
          dispatch(postBodyLoadedAction({ postId, body }));
        }
      }

      return dispatch(postViewSetPostAction(post));
    }
    return dispatch(postViewSetStatusAction("not-found"));
  } catch (error) {
    return dispatch(postViewErrorAction(error.message));
  }
};

