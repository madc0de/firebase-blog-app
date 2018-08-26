import { FirestoreDocument } from "./FirestoreDocument";
import { PostTitleData } from "./PostTitleData";

export interface PostTitlesState {
  postTitles: FirestoreDocument<PostTitleData>[]
}