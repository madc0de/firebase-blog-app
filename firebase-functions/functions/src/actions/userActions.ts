import * as admin from "firebase-admin";

type UserRoleOption = "admin" | "contributor";

export const set_user_role = async (userId: string, role: UserRoleOption) => {
  try {
    const userDoc = await admin
      .firestore()
      .doc(`users/${userId}`)
      .get();
    if (!userDoc.exists) {
      throw Error(`set_user_role document not found user/${userId}`);
    }
    const user = userDoc.data();
    const roles = user.roles || {};
    roles[role] = true;
    return userDoc.ref.set({ roles }, { merge: true });
  } catch (error) {
    return error;
  }
};

export const assing_admin_role_to_first_user = async (userId: string) => {
  try {
    const doc = await admin.firestore().collection('users').limit(2).get()
    if (doc.size === 1) {
      await set_user_role(userId, "admin")
      return true
    }
    return false
  } catch (error) {
    return error;
  }
};


