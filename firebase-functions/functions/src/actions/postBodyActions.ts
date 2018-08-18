import * as admin from "firebase-admin";

export async function set_postBody(
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

export async function delete_postBody(postId: string) {
  try {
    return admin.firestore().doc(`postbody/${postId}`).delete()
  } catch (err) {
    return err
  }
}

