import { FirestoreDocument } from "./FirestoreDocument";

export type Millisecons = number;
export type PostStatus = "draft" | "published";

export interface PostData {
  userId: string;
  photoUrl: string;

  title: string;
  body: string;
  excerpt: string;
  slug: string;

  created_date?: Millisecons;
  updated_date?: Millisecons;
  status: PostStatus;
  publish_date: Millisecons;
}

export type PostDocument = FirestoreDocument<PostData>