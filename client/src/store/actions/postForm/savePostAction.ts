
import { Dispatch } from "redux";
import  { Posts } from "../../../data";
const removeMd = require("remove-markdown");
import { getExcerptText, getSlug } from "../../../utils/textUtil";
import { dateToMilliseconds } from "../../../utils/dateUtil";
import { postFormSubmitStart, postFormSubmitSuccess, postFormSubmitError } from '.'
import { PostFormValues } from "../../../interface/PostFormValues";
import { PostData } from "../../../interface/PostData";


export const savePostAction = (postId: string, formValues: PostFormValues) => async (
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

export const postDataFromValues = (values: PostFormValues): PostData => {
  const postData = {
    userId: values.userId,
    photoUrl: values.photoUrl,
    title: values.title,
    slug: getSlug(values.title),
    body: values.body,
    excerpt: getExcerptText(removeMd(values.body), 28),
    status: values.status,
    publish_date: dateToMilliseconds(values.publish_date_string)
  };
  return postData;
};

