import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import * as postHandlers from "./handlers/postHandlers";
import * as userHandlers from "./handlers/userHandlers";

admin.initializeApp();

// posts
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

// users
export const on_user_create = functions.firestore
  .document("users/{userId}")
  .onCreate(userHandlers.handle_user_create);

export const on_user_delete = functions.firestore
  .document("users/{userId}")
  .onDelete(userHandlers.handle_user_delete);
