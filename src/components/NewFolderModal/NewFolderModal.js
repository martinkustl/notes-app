import React, { useState } from 'react';
import {
  IonModal,
  IonButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonInput
} from '@ionic/react';
import styled from 'styled-components';

const StyledModal = styled(IonModal)`
  --background: var(--ion-color-primary);
`;

const StyledForm = styled.form``;

const NewFolderModal = ({ showNewFolderModal, onShowNewFolderModalChange }) => {
  const [newFolderInput, setNewFolderInput] = useState();

  const handleFolderInputChange = e => {
    setNewFolderInput(e.target.value);
  };

  const createNewFolder = e => {
    e.preventDefault();
    console.log(e.target.folderName.value);
  };

  return (
    <StyledModal isOpen={showNewFolderModal} color="primary">
      <StyledForm onSubmit={createNewFolder}>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonButton
                onClick={() => onShowNewFolderModalChange(false)}
                color="danger"
                type="button"
              >
                Zrušit
              </IonButton>
            </IonButtons>
            <IonTitle>Nová složka</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => onShowNewFolderModalChange(false)}
                color="success"
                type="submit"
              >
                Vytvořit
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent color="primary">
          <IonInput
            placeholder="Zadejte název složky"
            value={newFolderInput}
            onChange={handleFolderInputChange}
            name="folderName"
          ></IonInput>
        </IonContent>
      </StyledForm>
    </StyledModal>
  );
};

export default NewFolderModal;
