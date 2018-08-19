import { Dispatch } from "redux";
import { getKey, getValue } from "../../../utils/mapUtil";
import { Posts } from "../../../data";
import { getPostBody } from "../../../data/Posts";
import { initial_PostFormValuesState } from "../../initialState";
import { formatDate } from "../../../utils/dateUtil";

import { postFormSetStatusAction } from './postFormSetStatusAction'
import { postFormSetValuesAction } from './postFormSetValuesAction'
import { postLoadedAction } from '../post'
import { GetStateFn } from "../../../interface/GetStateFn";
import { PostData, PostDocument } from "../../../interface/PostData";
import { PostFormValues } from "../../../interface/PostFormValues";

export const async_existingPost_SetFormValuesAction = (postId: string) => async (
  dispatch: Dispatch,
  getState: GetStateFn
) => {
  try {

    dispatch(postFormSetStatusAction("loading"));

    let post: PostDocument | undefined = getPostFromState(getState, postId);
    if (!post) {
      post = await Posts.getPostById(postId);
      if (post) {
        dispatch(postLoadedAction(post));
      }
    }

    if (post) {
      const postData = getValue(post) as PostData;
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
  getState: GetStateFn
) => {
  try {
    const authState = getState().authState
    const formValues = getNewPostFormValues(
      authState.authUserId,
      authState.authUserData.photoUrl as string
    );
    return dispatch(postFormSetValuesAction(formValues));
  } catch (error) {
    return dispatch(postFormSetStatusAction("error"));
  }
};

const getNewPostFormValues = (
  userId: string,
  photoUrl: string
): PostFormValues => {
  return {
    ...initial_PostFormValuesState,
    userId,
    photoUrl
  };
};

const getFormValuesFromPost = (post: PostDocument): PostFormValues => {
  const postId = getKey(post);
  const postData = getValue(post) as PostData;
  const formValues: PostFormValues = {
    ...postData,
    postId,
    publish_date_string: postData.publish_date
      ? formatDate(postData.publish_date)
      : ""
  };
  return formValues;
};

function getPostFromState(
  getState: GetStateFn,
  postId: string
): PostDocument | undefined {
  return getState().postsState.posts.find(post => {
    let record_postId = getKey(post);
    return record_postId === postId;
  });
}