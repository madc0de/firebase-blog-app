import * as functions from "firebase-functions";
import { DocumentSnapshot } from "@google-cloud/firestore";
import { update_post_count } from '../common/updatePostCount'
import { delete_post_body } from '../common/deletePostBody'
import { set_postbody_doc } from '../common';


export  async function handle_post_create(
  doc: DocumentSnapshot,
  context: functions.EventContext
) {
  try {
    const id = doc.id;
    const data = doc.data();

    // set postbody document
    await set_postbody_doc(id, data.userId, data.body);

    // remove post body, set post_number, and created_date
    const body = "";
    const post_number = await update_post_count("increment");
    const created_date = Date.now();
    return doc.ref.set({ body, post_number, created_date }, { merge: true });
  } catch (err) {
    return err
  }
}



export async function handle_post_update(change: functions.Change<DocumentSnapshot>, context: functions.EventContext) {
  try {
    const data = change.after.data();

    if (data.updated_date > Date.now() - 30 * 1000) {
      return;
    }

    data.updated_date = Date.now();

    return change.after.ref.set(data);
  } catch (err) {
    return err;
  }
}

export async function handle_post_write(change: functions.Change<DocumentSnapshot>, context: functions.EventContext) {
  try {
    // set postbody document
    const id = change.after.id;
    const data = change.after.data();

    if (!data.body || data.body.trim().length === 0) {
        return null
    }

    await set_postbody_doc(id, data.userId, data.body);

    // remove post.body to save space
    data.body = "";
    return change.after.ref.set(data, { merge: true });
  } catch (err) {
    return err;
  }
}

export async function handle_post_delete(doc: DocumentSnapshot, context: functions.EventContext) {
  try {
    const postId = doc.id
    await delete_post_body(postId)
    return update_post_count("decrement");
  } catch (err) {
    return err
  }
}
