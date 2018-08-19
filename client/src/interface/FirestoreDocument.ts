export interface FirestoreDocument<T> {
  [documentId: string]: T;
}
