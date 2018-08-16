import * as firebase from "firebase/app";
import "firebase/firestore";
import { Dispatch } from "redux";
import { userActions } from "../store/actions/";
import { IUserData } from "../interface";

export const listenForAuthStateChange = (dispatch: Dispatch) => {
  firebase.auth().onAuthStateChanged((firebaseUser: firebase.User) => {
    handlerAuthStateChange(firebaseUser, dispatch);
  });
}; 

const handlerAuthStateChange = (firebaseUser: firebase.User, dispatch: Dispatch) => {
  if (firebaseUser) {
    const userData: IUserData = {
      uid: firebaseUser.uid,
      email: firebaseUser.email as string,
      displayName: firebaseUser.displayName as string,
      photoUrl: firebaseUser.photoURL as string
    };

    dispatch(userActions.userAuthenticatedAction(userData));
    dispatch(userActions.ensureUserAccount(userData))
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
