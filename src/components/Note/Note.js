import React, { useState } from 'react';

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
  IonFooter
} from '@ionic/react';

const Note = ({ onIsNoteOpenChange, match, isNewNote, onCreateNote }) => {
  const [hideActionButtons, setHideActionButtons] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [note, setNote] = useState(false);
  const [photoUrl, setPhotoUrl] = useState();
  const [noteHeading, setNoteHeading] = useState();
  const [noteText, setNoteText] = useState();

  useIonViewWillEnter(() => {
    onIsNoteOpenChange(true);
    if (match.params.id) {
      firebase
        .firestore()
        .collection('notes')
        .doc(match.params.id)
        .onSnapshot(note => {
          setNote(note.data());
        });
    }
    if (isNewNote) {
      setIsEditable(true);
    }
  });

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

  const createNote = () => {
    const note = {
      heading: noteHeading,
      content: noteText
    };
    onCreateNote(note);
  };

  const handleEditClick = () => {
    setNoteHeading(note.heading);
    setNoteText(note.content);
    setIsEditable(true);
  };

  const handleNoteHeadingChange = e => {
    setNoteHeading(e.target.value);
  };

  const handleNoteTextChange = e => {
    setNoteText(e.target.value);
  };

  let content = null;

  if (note && !isNewNote) {
    if (isEditable) {
      content = (
        <NoteEdit
          createNote={createNote}
          noteHeading={noteHeading}
          noteText={noteText}
          handleNoteTextChange={handleNoteTextChange}
          handleNoteHeadingChange={handleNoteHeadingChange}
        />
      );
    } else {
      content = <NoteOverview note={note} handleEditClick={handleEditClick} />;
    }
  } else if (!note && isNewNote) {
    if (isEditable) {
      content = (
        <NoteEdit
          createNote={createNote}
          noteHeading={noteHeading}
          noteText={noteText}
          handleNoteTextChange={handleNoteTextChange}
          handleNoteHeadingChange={handleNoteHeadingChange}
        />
      );
    } else {
      content = <NoteOverview note={note} handleEditClick={handleEditClick} />;
    }
  } else {
    content = <div>Chyba</div>;
  }

  return (
    <IonPage>
      {content}
      <IonFooter>
        <NoteActionButtons />
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

const mapDispatchToProps = dispatch => {
  return {
    onCreateNote: note => dispatch(actionCreators.createNote(note))
  };
};

export default connect(null, mapDispatchToProps)(Note);
