import React from 'react';
import {
  IonModal,
  IonButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonIcon
} from '@ionic/react';

import { close, checkmark } from 'ionicons/icons';

import styled from 'styled-components';

const StyledModal = styled(IonModal)`
  --background: var(--ion-color-primary);
`;

const NewFolderModal = ({ showNewNoteModal, onShowNewNoteModalChange }) => {
  return (
    <IonContent color="primary">
      <StyledModal isOpen={showNewNoteModal} color="primary">
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonButton
                onClick={() => onShowNewNoteModalChange(false)}
                color="danger"
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
      </StyledModal>
    </IonContent>
  );
};

export default NewFolderModal;
