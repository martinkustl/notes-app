import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

/* import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'; */

import * as firebase from 'firebase';

import NoteOverview from './NoteOverview';
import NoteEdit from './NoteEdit';
import NoteActionButtons from '../NoteActionButtons/NoteActionButtons';

import {
  IonPage,
  useIonViewWillEnter,
  useIonViewWillLeave,
  IonFooter,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonIcon
} from '@ionic/react';

import { checkmark } from 'ionicons/icons';

const Note = ({
  onIsNoteOpenChange,
  match,
  isNewNote,
  loading,
  onUpdateNote,
  uid,
  ownerName
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [note, setNote] = useState(false);
  const [photoUrl, setPhotoUrl] = useState();
  const [noteHeading, setNoteHeading] = useState('');
  const [noteText, setNoteText] = useState('');
  const [isNew, setIsNew] = useState(isNewNote);

  useIonViewWillEnter(() => {
    try {
      setTimeout(() => {
        onIsNoteOpenChange(true);
        //const toolbar = quill.getModule('toolbar');
        //console.log(toolbar);
        //toolbar.addHandler('image', showImageUI);
      }, 301);
    } catch (err) {
      console.error(err);
    }
    if (match.params.id) {
      firebase
        .firestore()
        .collection('notes')
        .doc(match.params.id)
        .onSnapshot(note => {
          console.log(note);
          setNote(note.data());
          /* setNoteHeading(note.data().heading);
          setNoteText(note.data().content); */
          //setNoteText('&lt');
        });
    }
    if (isNew) {
      setIsEditable(true);
    }
  });

  const fetchNote = id => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .onSnapshot(note => {
        setNote({ ...note.data(), id: id });
      });
  };

  useIonViewWillLeave(() => {
    // setHideActionButtons(false);
    // onIsNoteOpenChange(false);
    try {
      setTimeout(() => {
        onIsNoteOpenChange(false);
      }, 300);
    } catch (err) {}
    //onIsNoteOpenChange(false);
  });

  /* const onPhotoUrlChange = state => {
    setPhotoUrl(state);
  }; */

  /*   useIonViewDidLeave(() => {
    setNoteText();
  }); */
  const handleSubmitNote = () => {
    let submitNote;
    if (isNew) {
      submitNote = {
        heading: noteHeading,
        content: noteText
      };
      // onCreateNote(submitNote);
      firebase
        .firestore()
        .collection('notes')
        .add({
          ...note,
          ownerId: uid,
          ownerName,
          content: submitNote.content,
          createdAt: new Date(),
          updatedAt: new Date(),
          heading: submitNote.heading
        })
        .then(docRef => {
          // setNoteId(docRef.id);
          fetchNote(docRef.id);
        })
        .catch(err => {});
      setIsNew(false);
    } else {
      if (match.params.id) {
        submitNote = {
          id: match.params.id,
          heading: noteHeading,
          content: noteText
        };
      } else {
        submitNote = {
          id: note.id,
          heading: noteHeading,
          content: noteText
        };
      }
      onUpdateNote(submitNote);
    }
    //setIsEditable(false);
  };

  const handleEditClick = () => {
    setNoteHeading(note.heading);
    setNoteText(note.content);
    setIsEditable(true);
  };

  const handleNoteHeadingChange = e => {
    setNoteHeading(e.target.value);
  };

  const handleNoteTextChange = value => {
    //setNoteText(e.target.value);
    //console.log(editor);
    //setNoteText(editor.getContents());
    console.log(value);
    setNoteText(value);
  };

  let content = <div>error</div>;

  if (note && !isNew && !loading) {
    /* if (isEditable) {
      content = (
        <NoteEdit
          handleSubmitNote={handleSubmitNote}
          noteHeading={noteHeading}
          noteText={noteText}
          handleNoteTextChange={handleNoteTextChange}
          handleNoteHeadingChange={handleNoteHeadingChange}
          note={note}
        />
      );
    } else if (!isEditable && !loading) {
      content = <NoteOverview note={note} handleEditClick={handleEditClick} />;
    } */
    content = (
      <NoteEdit
        handleSubmitNote={handleSubmitNote}
        noteHeading={noteHeading}
        noteText={noteText}
        handleNoteTextChange={handleNoteTextChange}
        handleNoteHeadingChange={handleNoteHeadingChange}
        note={note}
      />
    );
  } else if (!note && isNew && !loading) {
    /*  if (isEditable) {
      content = (
        <NoteEdit
          handleSubmitNote={handleSubmitNote}
          noteHeading={noteHeading}
          noteText={noteText}
          handleNoteTextChange={handleNoteTextChange}
          handleNoteHeadingChange={handleNoteHeadingChange}
          note={note}
        />
      );
    } else if (!isEditable && !loading) {
      content = <NoteOverview note={note} handleEditClick={handleEditClick} />;
    } */
    content = (
      <NoteEdit
        handleSubmitNote={handleSubmitNote}
        noteHeading={noteHeading}
        noteText={noteText}
        handleNoteTextChange={handleNoteTextChange}
        handleNoteHeadingChange={handleNoteHeadingChange}
        note={note}
      />
    );
  } else {
    content = <div>Chyba</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" color="secondary" />
          </IonButtons>
          <IonTitle>Cesta k poznámce</IonTitle>
          {/*  {isEditable && ( */}
          <IonButtons slot="end">
            <IonButton color="success" type="button" onClick={handleSubmitNote}>
              <IonIcon icon={checkmark} />
            </IonButton>
          </IonButtons>
          {/* )} */}
        </IonToolbar>
      </IonHeader>
      {console.log(isNewNote)}
      {content}
      <IonFooter>
        <NoteActionButtons note={note} noteId={match.params.id} />
      </IonFooter>
    </IonPage>
  );
};

/* const mapStateToProps = state => {
  console.log(state);
  return {
    note: state.firestore.ordered.note && state.firestore.ordered.note[0]
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (props.match.params.id) {
      return [
        { collection: 'notes', doc: props.match.params.id, storeAs: 'note' }
      ];
    } else {
      return [];
    }
  })
)(Note);
 */

const mapStateToProps = state => {
  return {
    loading: state.notes.loading,
    uid: state.firebase.auth.uid,
    ownerName: state.firebase.profile.userName
    //note: state.firestore.ordered.note && state.firestore.ordered.note[0]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateNote: note => dispatch(actionCreators.createNote(note)),
    onUpdateNote: note => dispatch(actionCreators.updateNote(note))
  };
};

/* export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    if (props.match.params.id) {
      return [
        { collection: 'notes', doc: props.match.params.id, storeAs: 'note' }
      ];
    } else {
      return [];
    }
  })
)(Note); */

export default connect(mapStateToProps, mapDispatchToProps)(Note);
