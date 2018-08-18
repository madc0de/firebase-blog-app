import * as functions from "firebase-functions";
import { DocumentSnapshot } from "@google-cloud/firestore";
import * as metaDataActions from "../actions/metaDataActions";
import * as userActions from "../actions/userActions";

export async function handle_user_create(
  doc: DocumentSnapshot,
  context: functions.EventContext
) {
  try {
    const user_count = await metaDataActions.update_user_count("increment");
    await userActions.assing_admin_role_to_first_user(doc.id)

    // set user_number, created_date
    return doc.ref.set(
      { user_number: user_count, created_date: Date.now() },
      { merge: true }
    );
  } catch (err) {
    return err;
  }
}

export async function handle_user_delete(
  doc: DocumentSnapshot,
  context: functions.EventContext
) {
  try {
    return metaDataActions.update_user_count("decrement")
  } catch (error) {
    return error
  }
}
