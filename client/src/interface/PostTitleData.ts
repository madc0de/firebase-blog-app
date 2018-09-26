import { FirestoreDocument } from "./FirestoreDocument";

export interface PostTitleData {
  userId: string;
  status: string;
  title: string;
  updated_date: number;
  publish_date: number;
}

export type PostTitleDocument = FirestoreDocument<PostTitleData>;
