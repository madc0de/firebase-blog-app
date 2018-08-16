import * as admin from "firebase-admin";

export async function delete_post_body(postId: string) {
  try {
    return admin.firestore().doc(`postbody/${postId}`).delete()
  } catch (err) {
    return err
  }
}
