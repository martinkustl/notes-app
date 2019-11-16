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

  return (
    <StyledModal isOpen={showNewNoteModal} color="primary">
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton
              onClick={() => onShowNewNoteModalChange(false)}
              color="danger"
              shape="round"
            >
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
          <IonTitle>Nová poznámka</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => onShowNewNoteModalChange(false)}
              color="success"
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
        ></IonTextarea>
        {photoUrl && <IonImg src={photoUrl} />}
      </IonContent>
      <NoteActionButtons onPhotoUrlChange={onPhotoUrlChange} />
    </StyledModal>
  );
};

export default NewFolderModal;
