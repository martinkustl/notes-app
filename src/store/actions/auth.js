import * as actionTypes from './actionTypes';

export const signUp = newUser => {
  return (dispatch, getState, getFirebase) => {
    dispatch({ type: actionTypes.SIGNUP_LOADING });
    const firebase = getFirebase();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(res => {
        return firebase
          .firestore()
          .collection('users')
          .doc(res.user.uid)
          .set({
            userName: newUser.name
          });
      })
      .then(() => {
        firebase
          .updateEmail(newUser.email, true)
          .then(() => dispatch({ type: actionTypes.SIGNUP_SUCCESS }));
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: actionTypes.SIGNUP_ERROR, error: { ...err } });
      });
  };
};
