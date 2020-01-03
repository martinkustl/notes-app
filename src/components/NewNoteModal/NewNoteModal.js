import React, { useState } from 'react';
import {
  IonModal,
  IonButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonIcon,
  IonTextarea,
  IonImg,
  IonFooter,
  useIonViewDidLeave
} from '@ionic/react';
import * as firebase from 'firebase';

import { close } from 'ionicons/icons';

import styled from 'styled-components';

import NoteActionButtons from '../NoteActionButtons/NoteActionButtons';

const StyledModal = styled(IonModal)`
  --background: var(--ion-color-primary);
`;

const StyledMainIonContent = styled(IonContent)`
  --padding-top: 0;
`;

const NewFolderModal = ({ showNewNoteModal, onShowNewNoteModalChange }) => {
  const [photoUrl, setPhotoUrl] = useState();
  const [noteText, setNoteText] = useState();

  useIonViewDidLeave(() => {
    setNoteText();
  });

  const onPhotoUrlChange = state => {
    setPhotoUrl(state);
  };

  const createNote = e => {
    e.preventDefault();
    firebase
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
      .catch(err => console.log(err));
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
          <IonContent className="ion-padding" color="primary">
            <IonTextarea
              autoGrow={true}
              autofocus={true}
              spellCheck={true}
              autoCorrect
              value={noteText}
              onChange={handleNoteTextChange}
              name="textArea"
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

export default NewFolderModal;
