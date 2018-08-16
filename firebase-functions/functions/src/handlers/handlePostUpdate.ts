import * as functions from "firebase-functions";
import { DocumentSnapshot } from "@google-cloud/firestore";

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