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

import * as firebase from 'firebase';

const StyledModal = styled(IonModal)`
  --background: var(--ion-color-primary);
`;

const NewFolderModal = ({ showNewFolderModal, onShowNewFolderModalChange }) => {
  const [newFolderInput, setNewFolderInput] = useState();

  const handleFolderInputChange = e => {
    setNewFolderInput(e.target.value);
  };

  const createNewFolder = e => {
    e.preventDefault();
    console.log(e.target.folderName.value);
    if (e.target.folderName.value) {
      firebase
        .firestore()
        .collection('folders')
        .add({
          name: e.target.folderName.value,
          created: firebase.firestore.FieldValue.serverTimestamp(), //exact time when this post was created
          owner: 'Some ID',
          owner_name: 'Here is Johny'
        })
        .then(res => {
          console.log(res);
          //I will get document as response. Document is something like raw in SQL
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <StyledModal
      isOpen={showNewFolderModal}
      color="primary"
      backdropDismiss={false}
    >
      {/* <StyledForm onSubmit={createNewFolder}>
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
          Start
          <IonInput
            placeholder="Zadejte název složky"
            value={newFolderInput}
            onChange={handleFolderInputChange}
            name="folderName"
            autocorrect
            type="text"
          />
          End
        </IonContent>
      </StyledForm> */}
      <form onSubmit={createNewFolder}>
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
        <IonContent color="primary" className="ion-padding" fullscreen={true}>
          <IonInput
            placeholder="Zadejte název složky"
            value={newFolderInput}
            onChange={handleFolderInputChange}
            name="folderName"
            autocorrect
            type="text"
            required
          />
        </IonContent>
      </form>
    </StyledModal>
  );
};

export default NewFolderModal;
