import { LoadingStatus } from './LoadingStatus';
import { UpdatingStatus } from './UpdatingStatus';
import { PostFormValues } from './PostFormValues';

export interface PostFormState {
  loadingStatus: LoadingStatus;
  updatingStatus: UpdatingStatus;
  postId: string | undefined;
  formValues?: PostFormValues;
  error: string;
}
