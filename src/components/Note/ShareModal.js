import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

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

import { checkmark } from 'ionicons/icons';

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
  noteId,
  onUpdateNoteShare,
  note,
  setNote
}) => {
  const [shareInput, setShareInput] = useState();

  const handleShareInputChange = e => {
    setShareInput(e.target.value);
  };
  useEffect(() => {
    setShareInput();
  }, [showShareModal]);

  const submitShareForm = e => {
    e.preventDefault();
    if (shareInput) {
      let share;
      if (noteId.params) {
        if (note.collaborators) {
          share = {
            id: noteId.params,
            collaborators: [...note.collaborators, shareInput]
          };
        } else {
          share = {
            id: noteId.params,
            collaborators: [shareInput]
          };
        }
      } else if (noteId.newId) {
        if (note.collaborators) {
          share = {
            id: noteId.newId,
            collaborators: [...note.collaborators, shareInput]
          };
        } else {
          share = {
            id: noteId.newId,
            collaborators: [shareInput]
          };
        }
      }
      setNote(prevState => {
        return { ...prevState, collaborators: [...share.collaborators] };
      });
      onUpdateNoteShare(share);
      setShareInput();
      //setShowShareModal(false);
    }
  };

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
          {/*  <IonButtons slot="end">
            <IonButton
              type="button"
              onClick={submitShareForm}
              color="secondary"
            >
              Potvrdit
            </IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary">
        {/*       <IonButton
        onClick={() => setShowShareModal(false)}
        color="secondary"
        fill="outline"
      >
        Zavřít
      </IonButton> */}
        {note.collaborators && (
          <IonList>
            {note.collaborators.map((collaborator, index) => (
              <IonItem key={index}>{collaborator}</IonItem>
            ))}
          </IonList>
        )}
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
      </IonContent>
    </StyledIonShareModal>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateNoteShare: share => dispatch(actionCreators.updateNoteShare(share))
  };
};

export default connect(null, mapDispatchToProps)(ShareModal);
