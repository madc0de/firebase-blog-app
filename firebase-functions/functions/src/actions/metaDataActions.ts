import * as admin from "firebase-admin";

type IncrementOption = "increment" | "decrement";

export async function update_post_count(option: IncrementOption) {
  try {
    const ref = admin.firestore().doc("metadata/values");
    const metadataDoc = await ref.get();
    let post_count: number = metadataDoc.exists
      ? metadataDoc.data().post_count
      : 0;
    post_count = option === "increment" ? post_count + 1 : post_count - 1;
    await ref.set({ post_count }, { merge: true });
    return post_count;
  } catch (err) {
    return err;
  }
}

export async function update_user_count(option: IncrementOption) {
  try {
    const ref = admin.firestore().doc("metadata/values");
    const metadataDoc = await ref.get();
    let user_count: number = metadataDoc.exists
      ? metadataDoc.data().post_count
      : 0;
    user_count = option === "increment" ? user_count + 1 : user_count - 1;
    await ref.set({ user_count }, { merge: true });
    return user_count;
  } catch (err) {
    return err;
  }
}

