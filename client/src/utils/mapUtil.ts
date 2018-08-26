import * as firebase from "firebase/app";

export function getKey(obj: Object) {
  return Object.keys(obj)[0];
}

export function getValue<T>(obj: Object): T {
  const id = getKey(obj);
  return obj[id] as T;
}

export function snapshotToMap(
  snapshot:
    | firebase.firestore.QueryDocumentSnapshot
    | firebase.firestore.DocumentSnapshot
) {
  const fields = snapshot.data() 
  return {
    [snapshot.id]: { ...fields }
  };
}
