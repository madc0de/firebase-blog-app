import * as firebase from "firebase/app";
import "firebase/firestore";
import { Dispatch } from "redux";
import { userActions } from "../store/actions/";
import { initial_UserData } from "../store/initialState";
import { UserData, UserDocument } from "../interface/UserData";

export const listenForAuthStateChange = (dispatch: Dispatch) => {
  firebase.auth().onAuthStateChanged((firebaseUser: firebase.User) => {
    handlerAuthStateChange(firebaseUser, dispatch);
  });
};

const handlerAuthStateChange = async (
  firebaseUser: firebase.User,
  dispatch: Dispatch
) => {
  if (firebaseUser) {
    const userId = firebaseUser.uid
    const userData: UserData = {
      ...initial_UserData,
      email: firebaseUser.email as string,
      displayName: firebaseUser.displayName as string,
      photoUrl: firebaseUser.photoURL as string,
    }
    const user: UserDocument = {
      [userId]: userData
    };

    dispatch(userActions.userAuthenticatedAction(user));
    await dispatch(userActions.ensureUserAccount(userId, userData));
  } else {
    dispatch(userActions.userSignedOut());
  }
};

export const signInWithGoogle = async () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

export const signInWithGithub = async () => {
  var provider = new firebase.auth.GithubAuthProvider()
  firebase.auth().signInWithPopup(provider);
};

export const signInWithFacebook = async () => {
  var provider = new firebase.auth.FacebookAuthProvider()
  firebase.auth().signInWithPopup(provider);
};


export const signOut = async () => {
  return firebase.auth().signOut();
};
