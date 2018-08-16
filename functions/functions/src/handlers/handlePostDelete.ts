import * as functions from "firebase-functions";
import { DocumentSnapshot } from "@google-cloud/firestore";
import { update_posts_count } from '../common/updatePostCount'
import { delete_post_body } from '../common/deletePostBody'

export async function handle_post_delete(doc: DocumentSnapshot, context: functions.EventContext) {
  try {
    const postId = doc.id
    await delete_post_body(postId)
    return update_posts_count("decrement");
  } catch (err) {
    return err
  }
}
