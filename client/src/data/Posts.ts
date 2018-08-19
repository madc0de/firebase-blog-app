import * as firebase from "firebase/app";
import * as mapUtil from "../utils/mapUtil";
import { firestore } from "./firestore-init";
import { PostDocument, PostData } from "../interface/PostData";
import { PostBodyData } from "../interface/PostBodyData";

export const getPostById = async (
  postId: string
): Promise<PostDocument | undefined> => {
  try {
    const ref = firestore.doc(`posts/${postId}`);
    const docSnapshot = await ref.get();
    if (docSnapshot.exists) {
      return mapUtil.snapshotToMap(docSnapshot) as PostDocument;
    }
    return undefined;
  } catch (error) {
    return error;
  }
};

export const getPostBySlug = async (
  slug: string
): Promise<PostDocument | undefined> => {
  try {
    const query = firestore.collection(`posts`).where("slug", "==", slug);
    const querySnapshot = await query.get();
    if (querySnapshot.docs.length > 0) {
      return mapUtil.snapshotToMap(querySnapshot.docs[0]) as PostDocument;
    }
    return undefined;
  } catch (error) {
    return error;
  }
};

export const getPostBody = async (
  postId: string
): Promise<string | undefined> => {
  try {
    const docSnapshot = await firebase
      .firestore()
      .doc(`postbody/${postId}`)
      .get();
    if (docSnapshot.exists) {
      const postBody = docSnapshot.data() as PostBodyData;
      return postBody.body;
    }
    return undefined;
  } catch (error) {
    return error;
  }
};

const getPostByDocRef = async (ref: firebase.firestore.DocumentReference) => {
const docSnap = await ref.get();
const post = mapUtil.snapshotToMap(docSnap) as PostDocument;
return post;
};

const getPostsFromQuerySnapshot = (
  querySnap: firebase.firestore.QuerySnapshot
) => {
  return querySnap.docs.map(docSnapshot => mapUtil.snapshotToMap(docSnapshot) as PostDocument)
};

/**
 * Create or update a Post
 * @param postId postID, omit for new post
 * @param postData 
 */
export const savePost = async (
  postId: string | undefined,
  postData: PostData
) => {
  if (postId) {
    return updatePost(postId as string, postData);
  }
  return addPost(postData);
};

export const addPost = async (postData: PostData) => {
  const ref = firestore.collection("posts");
  const docRef = await ref.add(postData);
  return getPostByDocRef(docRef);
};

export const updatePost = async (postId: string, postData: PostData) => {
  const ref = firestore.doc(`posts/${postId}`);
  await ref.set(postData, { merge: true });
  return getPostByDocRef(ref);
};

export const removePost = async (postId: string) => {
  const ref = firestore.doc(`posts/${postId}`);
  await ref.delete();
  return undefined;
};


export const getRecentlyUpdatedPosts = async (
  startAfterDate: number | undefined,
  limit: number,
): Promise<PostDocument[]>  => {
  try {
    let query = firestore.collection("posts").orderBy("updated_date", "desc");

    if (startAfterDate) {
      query = query.startAfter(startAfterDate);
    }
    const querySnap = await query.limit(limit).get();

    return getPostsFromQuerySnapshot(querySnap);
  } catch (error) {
    return error;
  }
};

export const getPublishedPosts = async (
  startAfterDate: number | undefined,
  limit: number
): Promise<PostDocument[]> => {
  try {
    let query = await firestore
      .collection("posts")
      .where("status", "==", "published");

    if (startAfterDate) {
      query.startAfter(startAfterDate);
    }

    const querySnap = await query
      .orderBy("publish_date", "desc")
      .limit(limit)
      .get();

    return getPostsFromQuerySnapshot(querySnap);
  } catch (error) {
    return error;
  }
};
