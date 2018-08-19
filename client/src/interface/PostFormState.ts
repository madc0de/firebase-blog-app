import { LoadingStatus } from './LoadingStatus';
import { SubmitStatus } from './SubmitStatus';
import { PostFormValues } from './PostFormValues';

export interface PostFormState {
  loadingStatus: LoadingStatus;
  submitStatus: SubmitStatus;
  postId: string | undefined;
  formValues?: PostFormValues;
  error: string;
}
