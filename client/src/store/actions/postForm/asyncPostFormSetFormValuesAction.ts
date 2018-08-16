import { Dispatch } from "redux";
import { getMapKey, getMapValue } from "../../../utils/mapUtil";
import {
  IGetState,
  IPost,
  IPostData,
  IPostFormValues,
} from "../../../interface";
import { Posts } from "../../../data";
import { getPostBody } from "../../../data/Posts";
import { initial_PostFormValuesState } from "../../initialState";
import { formatDate } from "../../../utils/dateUtil";

import { postFormSetStatusAction } from './postFormSetStatusAction'
import { postFormSetValuesAction } from './postFormSetValuesAction'
import { postLoadedAction } from '../post'

export const async_existingPost_SetFormValuesAction = (postId: string) => async (
  dispatch: Dispatch,
  getState: IGetState
) => {
  try {

    dispatch(postFormSetStatusAction("loading"));

    let post: IPost | undefined = getPostFromState(getState, postId);
    if (!post) {
      post = await Posts.getPostById(postId);
      if (post) {
        dispatch(postLoadedAction(post));
      }
    }

    if (post) {
      const postData = getMapValue(post) as IPostData;
      if (!postData.body) {
        postData.body = (await getPostBody(postId)) as string;
      }

      const formValues = getFormValuesFromPost(post);
      return dispatch(postFormSetValuesAction(formValues));
    }
    return dispatch(postFormSetStatusAction("not-found"));
  } catch (error) {
    return dispatch(postFormSetStatusAction("error"));
  }
};

export const async_newPost_SetFormValuesAction = () => async (
  dispatch: Dispatch,
  getState: IGetState
) => {
  try {
    const autUser = getState().authState.authUser;
    const formValues = getNewPostFormValues(
      autUser.uid as string,
      autUser.photoUrl as string
    );
    return dispatch(postFormSetValuesAction(formValues));
  } catch (error) {
    return dispatch(postFormSetStatusAction("error"));
  }
};

const getNewPostFormValues = (
  userId: string,
  photoUrl: string
): IPostFormValues => {
  return {
    ...initial_PostFormValuesState,
    userId,
    photoUrl
  };
};

const getFormValuesFromPost = (post: IPost): IPostFormValues => {
  const postId = getMapKey(post);
  const postData = getMapValue(post) as IPostData;
  const formValues: IPostFormValues = {
    ...postData,
    postId,
    publish_date_string: postData.publish_date
      ? formatDate(postData.publish_date)
      : ""
  };
  return formValues;
};

function getPostFromState(
  getState: IGetState,
  postId: string
): IPost | undefined {
  return getState().postsState.posts.find(post => {
    let record_postId = getMapKey(post);
    return record_postId === postId;
  });
}