import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { handle_post_create } from "./handlers/handlePostCreate";
import { handle_post_write } from "./handlers/handlePostWrite";
import { handle_post_update } from "./handlers/handlePostUpdate";
import { handle_post_delete } from "./handlers/handlePostDelete";

admin.initializeApp();

export const on_post_create = functions.firestore
  .document("posts/{postId}")
  .onCreate(handle_post_create);

export const on_post_write = functions.firestore
  .document("posts/{postId}")
  .onWrite(handle_post_write);

export const on_post_update = functions.firestore
  .document("posts/{postId}")
  .onUpdate(handle_post_update);

export const on_post_delete = functions.firestore
  .document("posts/{postId}")
  .onDelete(handle_post_delete);
