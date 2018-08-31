import { PostFormValues } from "../../interface/PostFormValues";
import { postFormActions } from "../../store/actions";

export const submitPost = async (values: PostFormValues, dispatch: any) => {
  const { postId } = values;
  return dispatch(postFormActions.savePostAction(postId, values))
};