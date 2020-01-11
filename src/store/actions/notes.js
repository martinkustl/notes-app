import * as actionTypes from './actionTypes';

/* import * as firebase from 'firebase'; */

/* firebase
      .firestore()
      .collection('notes')
      .onSnapshot(snapshot => {
        console.log(snapshot);
        snapshot.forEach(doc => fetchedNotes.push(doc.data()));
        setNotes([...fetchedNotes]);
        fetchedNotes = [];
      }); */

/* export const fetchNotesRequest = () => {
  return { type: actionTypes.FETCH_NOTES_REQUEST };
};

export const fetchNotesSuccess = snapshot => {
  console.log(snapshot);
  let notes = [];
  snapshot.forEach(doc => notes.push(doc.data()));
  console.log(notes);
  return { type: actionTypes.FETCH_NOTES_SUCCESS, notes: notes };
};

export const fetchNotesError = err => {
  return { type: actionTypes.FETCH_NOTES_ERROR, error: err };
}; */

/* export const fetchNotes = () => {
  return dispatch => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(snapshot => {
        //snapshot.forEach(doc => fetchedNotes.push(doc.data()));
        //setNotes([...fetchedNotes]);
        dispatch(fetchNotesSuccess(snapshot));
      });
  };
}; */

/* export const fetchNotes = () => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(snapshot => {
        //snapshot.forEach(doc => fetchedNotes.push(doc.data()));
        //setNotes([...fetchedNotes]);
        console.log(snapshot);
        dispatch(fetchNotesSuccess(snapshot));
      });
    //const firestore = getFirestore();
    //firestore.collection('notes').onSnapshot(snapshot => {
      //snapshot.forEach(doc => fetchedNotes.push(doc.data()));
      //setNotes([...fetchedNotes]);
     // console.log(snapshot);
     // dispatch(fetchNotesSuccess(snapshot));
    //}); 
  //};
}; */

export const createNote = note => {
  return (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();
    const state = getState();
    console.log(state.firebase.auth.uid);
    console.log(state.firebase.profile.userName);
    firestore
      .collection('notes')
      .add({
        ...note,
        ownerId: state.firebase.auth.uid,
        ownerName: state.firebase.profile.userName,
        content: note.content,
        createdAt: new Date(),
        heading: note.heading
      })
      .then(() => {
        dispatch({ type: actionTypes.CREATE_NOTE_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: actionTypes.CREATE_NOTE_ERROR, error: err });
      });
  };
};
