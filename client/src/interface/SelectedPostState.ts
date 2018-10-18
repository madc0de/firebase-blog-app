import { LoadingStatus } from './LoadingStatus';
import { PostDocument } from './PostData';

export interface SelectedPostState {
  loadingStatus: LoadingStatus;
  post?: PostDocument;
  error: string;
}
