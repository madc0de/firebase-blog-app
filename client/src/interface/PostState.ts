import { FirestoreDocument } from './FirestoreDocument';
import { PostData } from './PostData';

export interface PostsState {
  posts: FirestoreDocument<PostData>[];
}
