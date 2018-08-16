
import { Dispatch } from "redux";
import {
  IPostData,
  IPostFormValues,
} from "../../../interface";
import  { Posts } from "../../../data";
const removeMd = require("remove-markdown");
import { getExcerptText } from "../../../utils/textUtil";
import { dateToMilliseconds } from "../../../utils/dateUtil";
import { postFormSubmitStart, postFormSubmitSuccess, postFormSubmitError } from './index'

export const asyncSavePostAction = (postId: string, formValues: IPostFormValues) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(postFormSubmitStart())
    const postData = postDataFromValues(formValues) 
    const post = await Posts.savePost(postId, postData);
    return dispatch(postFormSubmitSuccess(post))
  } catch(error) {
    return dispatch(postFormSubmitError(error.message))
  }
};

export const postDataFromValues = (values: IPostFormValues): IPostData => {
  const postData = {
    userId: values.userId,
    photoUrl: values.photoUrl,
    title: values.title,
    slug: values.slug != null ? values.slug.trim() : "",
    body: values.body,
    excerpt: getExcerptText(removeMd(values.body), 28),
    status: values.status,
    publish_date: dateToMilliseconds(values.publish_date_string)
  };
  return postData;
};