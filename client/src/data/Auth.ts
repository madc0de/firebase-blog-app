import * as firebase from "firebase/app";
import "firebase/firestore";
import { Dispatch } from "redux";
import { userActions } from "../store/actions/";
import { IUser } from "../interface";

export const listenForAuthStateChange = (dispatch: Dispatch) => {
  firebase.auth().onAuthStateChanged((firebaseUser: firebase.User) => {
    handlerAuthStateChange(firebaseUser, dispatch);
  });
};

const handlerAuthStateChange = (firebaseUser: firebase.User, dispatch: Dispatch) => {
  if (firebaseUser) {
    const user: IUser = {
      uid: firebaseUser.uid,
      email: firebaseUser.email as string,
      displayName: firebaseUser.displayName as string,
      photoUrl: firebaseUser.photoURL as string
    };

    dispatch(userActions.userAuthenticatedAction(user));
  } else {
    dispatch(userActions.userSignedOut());
  }
};

export const signInWithGoogle = async () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

export const signOut = async () => {
  return firebase.auth().signOut();
};
