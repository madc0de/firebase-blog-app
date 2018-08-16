import * as admin from "firebase-admin";

export async function set_postbody_doc(
  postId: string,
  userId: string,
  body: string
) {
  try {
    const ref = admin.firestore().doc(`postbody/${postId}`);
    const postBody = { userId, body };
    return ref.set(postBody);
  } catch (err) {
    return err;
  }
}