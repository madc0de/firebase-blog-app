import { LoadingStatus } from './LoadingStatus';
import { FirestoreDocument } from './FirestoreDocument';
import { PostData } from './PostData';

export interface PostViewState {
  loadingStatus: LoadingStatus;
  slugOrID: string | undefined;
  post?: FirestoreDocument<PostData>;
  error: string;
}
