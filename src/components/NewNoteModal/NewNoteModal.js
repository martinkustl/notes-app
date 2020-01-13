import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import {
  IonModal,
  IonButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonIcon,
  IonInput,
  IonTextarea,
  IonImg,
  IonFooter,
  useIonViewDidLeave
} from '@ionic/react';

import { close } from 'ionicons/icons';

import styled from 'styled-components';

import NoteActionButtons from '../NoteActionButtons/NoteActionButtons';

const StyledModal = styled(IonModal)`
  --background: var(--ion-color-primary);
`;

const StyledMainIonContent = styled(IonContent)`
  --padding-top: 0;
`;

const NewNoteModal = ({
  showNewNoteModal,
  onShowNewNoteModalChange,
  auth,
  onCreateNote
}) => {
  const [photoUrl, setPhotoUrl] = useState();
  const [noteHeading, setNoteHeading] = useState();
  const [noteText, setNoteText] = useState();

  useIonViewDidLeave(() => {
    setNoteText();
  });

  const onPhotoUrlChange = state => {
    setPhotoUrl(state);
  };

  const createNote = e => {
    e.preventDefault();
    /* firebase
      .firestore()
      .collection('notes')
      .add({
        text: e.target.textArea.value,
        created: firebase.firestore.FieldValue.serverTimestamp(), //exact time when this post was created
        owner: 'Some ID',
        owner_name: 'Here is Johny'
      })
      .then(res => {
        console.log(res);
        //I will get document as response. Document is something like raw in SQL
      })
      .catch(err => console.log(err)); */
    const note = {
      heading: noteHeading,
      content: noteText
    };

    /*    ownerId: note.uid,
        ownerName: note.userName,
        content: note.content,
        createdAt: new Date(),
        heading: note.heading */

    onCreateNote(note);
  };

  const handleNoteHeadingChange = e => {
    setNoteHeading(e.target.value);
  };

  const handleNoteTextChange = e => {
    setNoteText(e.target.value);
  };

  return (
    <StyledModal isOpen={showNewNoteModal} color="primary">
      <StyledMainIonContent color="primary" fullscreen={true}>
        <form onSubmit={createNote}>
          <IonHeader>
            <IonToolbar color="primary">
              <IonButtons slot="start">
                <IonButton
                  onClick={() => onShowNewNoteModalChange(false)}
                  color="danger"
                  shape="round"
                  type="button"
                >
                  <IonIcon icon={close} />
                </IonButton>
              </IonButtons>
              <IonTitle>Nová poznámka</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  onClick={() => onShowNewNoteModalChange(false)}
                  color="success"
                  type="submit"
                >
                  Vytvořit
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding" color="primary" fullscreen={true}>
            <IonInput
              type="string"
              placeholder="Nadpis"
              value={noteHeading}
              name="heading"
              onIonChange={handleNoteHeadingChange}
              required
            />
            <IonTextarea
              autoGrow={true}
              autofocus={true}
              spellCheck={true}
              autoCorrect
              value={noteText}
              onIonChange={handleNoteTextChange}
              name="textArea"
              placeholder="Obsah poznámky"
              required
            ></IonTextarea>
            {photoUrl && <IonImg src={photoUrl} />}
          </IonContent>
        </form>
      </StyledMainIonContent>
      <IonFooter>
        <NoteActionButtons onPhotoUrlChange={onPhotoUrlChange} />
      </IonFooter>
    </StyledModal>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateNote: note => dispatch(actionCreators.createNote(note))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNoteModal);
