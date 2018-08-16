import * as functions from "firebase-functions";
import { DocumentSnapshot } from "@google-cloud/firestore";
import { set_postbody_doc } from '../common/setPostBody'

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