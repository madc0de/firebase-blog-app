import { PostData } from './PostData';

export interface PostFormValues extends PostData {
  postId: string;
  publish_date_string: string;
}
