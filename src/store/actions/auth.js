import * as actionTypes from './actionTypes';

export const login = credentials => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: actionTypes.LOGIN_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: actionTypes.LOGIN_ERROR, error: err });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const firestore = getFirebase().firestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(res => {
        return firestore
          .collection('users')
          .doc(res.user.uid)
          .set({
            userName: newUser.name
          });
      })
      .then(() => {
        dispatch({ type: actionTypes.SIGNUP_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: actionTypes.SIGNUP_ERROR, error: err });
      });
  };
};

export const logout = () => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: actionTypes.LOGOUT_SUCCESS });
      });
  };
};
