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
  IonImg
} from '@ionic/react';
import * as firebase from 'firebase';

import { close } from 'ionicons/icons';

import styled from 'styled-components';

import NoteActionButtons from '../NoteActionButtons/NoteActionButtons';

const StyledModal = styled(IonModal)`
  --background: var(--ion-color-primary);
`;

const NewFolderModal = ({ showNewNoteModal, onShowNewNoteModalChange }) => {
  const [photoUrl, setPhotoUrl] = useState();

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

  return (
    <StyledModal isOpen={showNewNoteModal} color="primary">
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
        <IonContent color="primary" className="ion-padding">
          <IonTextarea
            autoGrow={true}
            autofocus={true}
            spellCheck={true}
            autoCorrect
            name="textArea"
          ></IonTextarea>
          {photoUrl && <IonImg src={photoUrl} />}
        </IonContent>
      </form>
      <NoteActionButtons onPhotoUrlChange={onPhotoUrlChange} />
    </StyledModal>
  );
};

export default NewFolderModal;
