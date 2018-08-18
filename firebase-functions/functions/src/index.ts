import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import * as postHandlers from "./handlers";

admin.initializeApp();

export const on_post_create = functions.firestore
  .document("posts/{postId}")
  .onCreate(postHandlers.handle_post_create);

export const on_post_write = functions.firestore
  .document("posts/{postId}")
  .onWrite(postHandlers.handle_post_write);

export const on_post_update = functions.firestore
  .document("posts/{postId}")
  .onUpdate(postHandlers.handle_post_update);

export const on_post_delete = functions.firestore
  .document("posts/{postId}")
  .onDelete(postHandlers.handle_post_delete);
