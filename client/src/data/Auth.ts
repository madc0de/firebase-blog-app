import * as firebase from "firebase/app";
import "firebase/firestore";
import { Dispatch } from "redux";
import { userActions, postActions } from "../store/actions/";
import { initial_UserData } from "../store/initialState";
import { UserData, UserDocument } from "../interface/UserData";
import { authErrorAction } from "../store/actions/user/authErrorAction";

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
    const userId = firebaseUser.uid;
    const userData: UserData = {
      ...initial_UserData,
      email: firebaseUser.email as string,
      displayName: firebaseUser.displayName as string,
      photoUrl: firebaseUser.photoURL as string
    };
    const user: UserDocument = {
      [userId]: userData
    };

    dispatch(userActions.userAuthenticatedAction(user));
    dispatch(postActions.loadPostTitles(userId))
    await dispatch(userActions.ensureUserAccount(userId, userData));
  } else {
    dispatch(userActions.userSignedOut());
  }
};

const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

const signInWithGithub = async () => {
  const provider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

const signInWithFacebook = async () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export type SigninProviderOption = "google" | "github" | "facebook";
export const signInWithProviderAction = (
  authProvider: SigninProviderOption
) => async (dispatch: Dispatch) => {
  try {
    switch (authProvider) {
      case "google": {
        await signInWithGoogle();
        return true;
      }
      case "github": {
        await signInWithGithub();
        return true;
      }
      case "facebook": {
        await signInWithFacebook();
        return true;
      }
      default:
        return true;
    }
  } catch (error) {
    dispatch(authErrorAction(error.message));
    return error;
  }
};

export const signOut = async () => {
  return firebase.auth().signOut();
};
