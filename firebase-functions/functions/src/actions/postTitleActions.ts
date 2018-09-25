import * as admin from "firebase-admin";

export async function set_postTitle(
  postId: string,
  postData: any,
) {
  try {
    const ref = admin.firestore().doc(`posttitle/${postId}`);
    const postBody = { 
      userId: postData.userId, 
      title: postData.title,      
      status: postData.status,
      photoUrl: postData.photoUrl,
      publish_date: postData.publish_date,
      updated_date: postData.updated_date    
    };
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

