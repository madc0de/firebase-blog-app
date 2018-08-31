import * as admin from "firebase-admin";

export async function set_postTitle(
  postId: string,
  userId: string,
  status: string,
  title: string
) {
  try {
    const ref = admin.firestore().doc(`posttitle/${postId}`);
    const postBody = { userId, status, title };
    return ref.set(postBody);
  } catch (err) {
    return err;
  }
}

export async function delete_postTitle(postId: string) {
  try {
    return admin.firestore().doc(`posttitle/${postId}`).delete()
  } catch (err) {
    return err
  }
}

