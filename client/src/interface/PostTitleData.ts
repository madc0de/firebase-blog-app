import { FirestoreDocument } from "./FirestoreDocument";
import { PostData } from "./PostData";

export interface PostTitleData {
  userId?: string;
  title: string;
}

export type PostTitleDocument = FirestoreDocument<PostData>