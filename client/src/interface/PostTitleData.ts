import { FirestoreDocument } from "./FirestoreDocument";

export interface PostTitleData {
  userId: string;
  status: string;
  title: string;
}

export type PostTitleDocument = FirestoreDocument<PostTitleData>;
