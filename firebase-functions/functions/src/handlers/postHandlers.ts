import * as functions from "firebase-functions";
import { DocumentSnapshot } from "@google-cloud/firestore";

import * as postBodyActions from "../actions/postBodyActions";
import * as metaDataActions from "../actions/metaDataActions";

export async function handle_post_create(
  doc: DocumentSnapshot,
  context: functions.EventContext
) {
  try {
    const id = doc.id;
    const data = doc.data();

    await postBodyActions.set_postBody(id, data.userId, data.body);

    const post_count = await metaDataActions.update_post_count("increment");
    // remove post body, set post_umber. created_date
    return doc.ref.set(
      { body: "", post_number: post_count, created_date: Date.now() },
      { merge: true }
    );
  } catch (err) {
    return err;
  }
}

export async function handle_post_update(
  change: functions.Change<DocumentSnapshot>,
  context: functions.EventContext
) {
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

export async function handle_post_write(
  change: functions.Change<DocumentSnapshot>,
  context: functions.EventContext
) {
  try {
    // set postbody document
    const id = change.after.id;
    const data = change.after.data();

    // pevent infinite loop
    if (!data.body || data.body.trim().length === 0) {
      return null;
    }

    await postBodyActions.set_postBody(id, data.userId, data.body);
    // post body can be removed
    return change.after.ref.set({ body: ''}, { merge: true });
  } catch (err) {
    return err;
  }
}

export async function handle_post_delete(
  doc: DocumentSnapshot,
  context: functions.EventContext
) {
  try {
    const postId = doc.id;
    await postBodyActions.delete_postBody(postId);
    return metaDataActions.update_post_count("decrement");
  } catch (err) {
    return err;
  }
}
