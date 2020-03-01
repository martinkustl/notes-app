import React, { useState, useEffect } from 'react';

import {
  IonModal,
  IonButton,
  IonToolbar,
  IonButtons,
  IonHeader,
  IonTitle,
  IonContent,
  IonInput,
  IonList,
  IonItem,
  IonIcon
} from '@ionic/react';

import { checkmark, create, close } from 'ionicons/icons';

import styled from 'styled-components';

const StyledIonShareModal = styled(IonModal)`
  --background: var(--ion-color-primary);
`;

const StyledForm = styled.form`
  padding: 0 16px;
  display: flex;
`;

const StyledIonInput = styled(IonInput)`
  border: 1px solid grey;
  --padding-start: 3px;
`;

const ShareModal = ({
  showShareModal,
  setShowShareModal,
  updateNoteShare,
  note,
  setNote
}) => {
  const [shareInput, setShareInput] = useState();
  const [editShareList, setEditShareList] = useState(false);

  const handleShareInputChange = e => {
    setShareInput(e.target.value);
  };
  useEffect(() => {
    setShareInput();
  }, [showShareModal]);

  const submitShareForm = e => {
    e.preventDefault();
    let isValid = true;
    if (shareInput && note.id) {
      let share;
      if (note.collaborators) {
        share = {
          id: note.id,
          collaborators: [...note.collaborators, shareInput],
          updatedAt: new Date()
        };
      } else {
        share = {
          id: note.id,
          collaborators: [shareInput],
          updatedAt: new Date()
        };
      }
      if (note.collaborators) {
        note.collaborators.forEach(collab => {
          if (collab === shareInput) {
            isValid = false;
          }
        });
      }
      if (isValid) {
        setNote(prevState => {
          return { ...prevState, collaborators: [...share.collaborators] };
        });
        updateNoteShare(share);
        setShareInput();
      }
    }
  };

  const handleDeleteClick = collaborator => {
    const updated = note.collaborators.filter(collab => {
      return collab !== collaborator;
    });
    let share;
    if (note.id) {
      share = {
        id: note.id,
        collaborators: [...updated],
        updatedAt: new Date()
      };
    }
    updateNoteShare(share);
  };

  let collabList = null;

  if (note && note.collaborators) {
    collabList = (
      <IonList className="ion-no-padding">
        {note.collaborators.map((collaborator, index) => (
          <IonItem key={index}>
            {collaborator}
            {editShareList && (
              <IonButton
                slot="end"
                color="danger"
                fill="clear"
                onClick={() => handleDeleteClick(collaborator)}
              >
                <IonIcon icon={close} />
              </IonButton>
            )}
          </IonItem>
        ))}
      </IonList>
    );
  }

  return (
    <StyledIonShareModal isOpen={showShareModal}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton
              type="button"
              onClick={() => setShowShareModal(false)}
              color="secondary"
            >
              Zpět
            </IonButton>
          </IonButtons>
          <IonTitle>Sdílení</IonTitle>
          <IonButtons slot="end">
            <IonButton
              type="button"
              onClick={() => setEditShareList(prevState => !prevState)}
              color="secondary"
            >
              <IonIcon icon={create} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary">
        <StyledForm onSubmit={submitShareForm}>
          <StyledIonInput
            value={shareInput}
            type="email"
            onIonChange={handleShareInputChange}
            placeholder="Zadejte email uživatele"
            required
          />
          <IonButton
            type="submit"
            color="success"
            fill="clear"
            className="ion-no-padding ion-no-margin"
          >
            <IonIcon icon={checkmark} size="large" />
          </IonButton>
        </StyledForm>
        {collabList}
      </IonContent>
    </StyledIonShareModal>
  );
};

export default ShareModal;
