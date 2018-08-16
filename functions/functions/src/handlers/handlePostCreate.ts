import * as functions from "firebase-functions";
import { DocumentSnapshot } from "@google-cloud/firestore";
import { set_postbody_doc } from '../common/setPostBody'
import { update_posts_count } from '../common/updatePostCount'

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
    const post_number = await update_posts_count("increment");
    const created_date = Date.now();
    return doc.ref.set({ body, post_number, created_date }, { merge: true });
  } catch (err) {
    return err
  }
}

