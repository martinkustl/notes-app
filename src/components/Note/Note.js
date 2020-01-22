import React, { useState, useEffect, useCallback } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import * as firebase from 'firebase';

import { debounce, fetchNote } from '../../shared/utility';

import { create } from 'ionicons/icons';

import ReactQuill from 'react-quill';

import NoteActionButtons from './NoteActionButtons/NoteActionButtons';
import ActionSheet from './ActionSheet';
import ShareModal from './ShareModal';

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
  IonIcon,
  IonContent,
  IonInput
} from '@ionic/react';

import styled from 'styled-components';

const StyledIonInput = styled(IonInput)`
  font-size: 24px;
  margin-bottom: 15px;
`;

const Note = ({
  onIsNoteOpenChange,
  match,
  isNewNote,
  loading,
  onUpdateNote,
  uid,
  ownerName
}) => {
  const [note, setNote] = useState(false);
  const [noteHeading, setNoteHeading] = useState('');
  const [noteText, setNoteText] = useState('');
  const [isNew, setIsNew] = useState(isNewNote);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useIonViewWillEnter(() => {
    try {
      setTimeout(() => {
        onIsNoteOpenChange(true);
      }, 301);
    } catch (err) {
      console.error(err);
    }
    console.log('loads note');
    if (match.params.id) {
      fetchNote(match.params.id).then(note => {
        setNote(prevState => {
          return { ...note, id: prevState.id };
        });
        setNoteHeading(note.heading);
        setNoteText(note.content);
      });
    }
  });
  useEffect(() => {
    if (note.id) {
      fetchNote(note.id).then(note => {
        setNote(prevState => {
          return { ...note, id: prevState.id };
        });
        setNoteHeading(note.heading);
        setNoteText(note.content);
      });
    }
  }, [note.id]);

  useIonViewWillLeave(() => {
    try {
      setTimeout(() => {
        onIsNoteOpenChange(false);
      }, 300);
    } catch (err) {}
    //onIsNoteOpenChange(false);
  });

  const handleSubmitNote = useCallback(
    debounce((heading, content, note, uid, ownerName, isNew, params) => {
      let submitNote;
      if (isNew) {
        console.log('submited');
        submitNote = {
          heading: heading,
          content: content
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
            fetchNote(docRef.id).then(note =>
              setNote({ ...note, id: docRef.id })
            );
            setIsNew(false);
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        if (params) {
          submitNote = {
            id: params,
            heading: heading,
            content: content
          };
        } else {
          submitNote = {
            id: note.id,
            heading: heading,
            content: content
          };
        }
        console.log(submitNote);
        onUpdateNote(submitNote);
      }
    }, 1500),
    []
  );

  const getAllImages = str => {
    let regex = new RegExp('<img .*?src="(.*?)"', 'gi'),
      result,
      res = [];
    while ((result = regex.exec(str))) {
      res.push(result[1]);
    }
    return res;
  };

  const deleteImageFromFirebase = imageUrl => {
    const imageRef = firebase.storage().refFromURL(imageUrl);
    imageRef
      .delete()
      .then(() => {
        console.log('image deleted from firebase');
      })
      .catch(error => {
        console.log('Problem during image delete');
        console.error(error);
      });
  };

  const handleNoteHeadingChange = e => {
    setNoteHeading(e.target.value);
    if (e.target.value && noteText) {
      handleSubmitNote(
        e.target.value,
        noteText,
        note,
        uid,
        ownerName,
        isNew,
        match.params.id
      );
    }
  };

  const handleNoteTextChange = content => {
    if (noteText !== '') {
      const newImageArray = getAllImages(content);
      const oldImageArray = getAllImages(noteText);
      if (oldImageArray.length > newImageArray.length) {
        const deletedImages = oldImageArray.filter(
          image => !newImageArray.includes(image)
        );
        deletedImages.forEach(image => {
          deleteImageFromFirebase(image);
        });
      }
    }
    setNoteText(content);
    if (noteHeading && content) {
      handleSubmitNote(
        noteHeading,
        content,
        note,
        uid,
        ownerName,
        isNew,
        match.params.id
      );
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" color="secondary" />
          </IonButtons>
          <IonTitle>Cesta k poznámce</IonTitle>
          <IonButtons slot="end">
            <IonButton
              type="button"
              onClick={() => setShowActionSheet(true)}
              color="secondary"
            >
              <IonIcon icon={create} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" color="primary" fullscreen={true}>
        <form>
          <StyledIonInput
            type="string"
            placeholder="Nadpis"
            value={noteHeading}
            name="heading"
            onIonChange={handleNoteHeadingChange}
            required={true}
            className="ion-no-padding"
          />
          <ReactQuill value={noteText} onChange={handleNoteTextChange} />
        </form>
        <ActionSheet
          showActionSheet={showActionSheet}
          setShowActionSheet={setShowActionSheet}
          setShowShareModal={setShowShareModal}
        />
        <ShareModal
          showShareModal={showShareModal}
          setShowShareModal={setShowShareModal}
          noteId={{ params: match.params.id, newId: note.id }}
          note={note}
          setNote={setNote}
        />
      </IonContent>
      <IonFooter>
        <NoteActionButtons
          note={note}
          noteId={{ params: match.params.id, newId: note.id }}
          noteText={noteText}
          handleNoteTextChange={handleNoteTextChange}
        />
      </IonFooter>
    </IonPage>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.notes.loading,
    uid: state.firebase.auth.uid,
    ownerName: state.firebase.profile.userName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateNote: note => dispatch(actionCreators.createNote(note)),
    onUpdateNote: note => dispatch(actionCreators.updateNote(note))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);
