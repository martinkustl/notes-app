import React, { Fragment } from 'react';

import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonBackButton,
  IonInput,
  IonTextarea,
  IonButton
} from '@ionic/react';

import styled from 'styled-components';

const StyledIonInput = styled(IonInput)`
  font-size: 24px;
  margin-bottom: 15px;
`;

const StyledIonTextarea = styled(IonTextarea)``;

const NoteEdit = ({
  createNote,
  noteHeading,
  noteText,
  handleNoteHeadingChange,
  handleNoteTextChange
}) => {
  return (
    <Fragment>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" color="secondary" />
          </IonButtons>
          <IonTitle>Cesta k poznámce</IonTitle>
          <IonButtons slot="end">
            <IonButton color="success" type="button" onClick={createNote}>
              Vytvořit
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" color="primary" fullscreen={true}>
        <form>
          <StyledIonInput
            type="string"
            placeholder="Nadpis"
            value={noteHeading}
            name="heading"
            onIonChange={handleNoteHeadingChange}
            required
            className="ion-no-padding"
          />
          <StyledIonTextarea
            autoGrow={true}
            autofocus={true}
            spellCheck={true}
            autoCorrect
            value={noteText}
            onIonChange={handleNoteTextChange}
            name="textArea"
            placeholder="Obsah poznámky"
            required
            className="ion-no-padding ion-no-margin"
          />
        </form>
      </IonContent>
    </Fragment>
  );
};

export default NoteEdit;
