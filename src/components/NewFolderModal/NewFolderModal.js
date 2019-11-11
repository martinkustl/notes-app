import React from 'react';
import {
  IonModal,
  IonButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle
} from '@ionic/react';
import styled from 'styled-components';

const StyledModal = styled(IonModal)`
  --background: var(--ion-color-primary);
`;

const NewFolderModal = ({ showNewFolderModal, onShowNewFolderModalChange }) => {
  return (
    <IonContent color="primary">
      <StyledModal isOpen={showNewFolderModal} color="primary">
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonButton
                onClick={() => onShowNewFolderModalChange(false)}
                color="danger"
              >
                Zrušit
              </IonButton>
            </IonButtons>
            <IonTitle>Nová složka</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => onShowNewFolderModalChange(false)}
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
