import * as actionTypes from './actionTypes';

/* import * as firebase from 'firebase'; */

export const createNote = note => {
  return (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();
    const state = getState();
    dispatch({ type: actionTypes.CREATE_NOTE_REQUEST });
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
        console.log('error occured');
        console.error(err);
        dispatch({ type: actionTypes.CREATE_NOTE_ERROR, error: err });
      });
  };
};

export const updateNote = note => {
  return (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection('notes')
      .doc(note.id)
      .update({
        ...note,
        content: note.content,
        updatedAt: new Date(),
        heading: note.heading
      })
      .then(data => {
        console.log('document updated');
        // dispatch({ type: actionTypes.CREATE_NOTE_SUCCESS });
      })
      .catch(err => {
        console.log('error occured');
        console.error(err);
        // dispatch({ type: actionTypes.CREATE_NOTE_ERROR, error: err });
      });
  };
};

export const updateNoteShare = share => {
  return (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection('notes')
      .doc(share.id)
      .update({
        updatedAt: new Date(),
        //collaborators: share.collaborators
        collaborators: share.collaborators
      })
      .then(data => {
        console.log(data);
        console.log('document share updated');
        // dispatch({ type: actionTypes.CREATE_NOTE_SUCCESS });
      })
      .catch(err => {
        // dispatch({ type: actionTypes.CREATE_NOTE_ERROR, error: err });
      });
  };
};

export const deleteNote = id => {
  return (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();
    /* firestore
      .delete({ collection: 'cities', doc: 'SF' })
      .then(() => console.log('note deleted')); */
    firestore
      .collection('notes')
      .doc(id)
      .delete()
      .then(() => {
        console.log('note deleted');
      })
      .catch(err => {
        console.log('error occured during delete');
        console.log(err);
      });
  };
};
