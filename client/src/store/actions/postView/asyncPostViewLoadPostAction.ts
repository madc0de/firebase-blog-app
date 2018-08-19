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
import {
  IGetState,
  IPost,
  IPostData,
} from "../../../interface";
import { Posts } from '../../../data';


export const asyncPostViewLoadPostAction = (slugOrId: string) => async (
  dispatch: Dispatch,
  getState: IGetState
) => {
  try {
    dispatch(postViewSetStatusAction("loading"));
    let post: IPost | undefined = getState().postsState.posts.find(post => {
      let postId = getKey(post);
      let slug = (getValue(post) as IPostData).slug;
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
      const postData = getValue(post) as IPostData;

      if (!postData.body) {
        const body = await Posts.getPostBody(postId) as string;
        if (body) {
          dispatch(postBodyLoadedAction({ postId, body }));
        }
      } else {
        console.log('post already has body')
      }

      return dispatch(postViewSetPostAction(post));
    }
    return dispatch(postViewSetStatusAction("not-found"));
  } catch (error) {
    return dispatch(postViewErrorAction(error.message));
  }
};

