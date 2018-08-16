import * as admin from "firebase-admin";

type PostCountUpdateOption = "increment" | "decrement";
export async function update_posts_count(option: PostCountUpdateOption) {
  try {
    const ref = admin.firestore().doc("metadata/posts");
    const metadataDoc = await ref.get();
    let post_count: number = metadataDoc.exists
      ? metadataDoc.data().post_count
      : 0;
    post_count = option === "increment" ? post_count + 1 : post_count - 1;
    await ref.set({ post_count: post_count }, { merge: true });
    return post_count;
  } catch (err) {
    return err;
  }
}