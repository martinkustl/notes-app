import React, { Fragment } from 'react';

import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonBackButton
} from '@ionic/react';

import styled from 'styled-components';

const StyledNoteHeading = styled.h2`
  margin: 0;
  margin-bottom: 15px;
`;

const NoteOverview = ({ note, handleEditClick }) => {
  return (
    <Fragment>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" color="secondary" />
          </IonButtons>
          <IonTitle>Cesta k poznámce</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        color="primary"
        className="ion-padding"
        fullscreen={true}
        onClick={handleEditClick}
      >
        <StyledNoteHeading>{note.heading}</StyledNoteHeading>
        <p>{note.content}</p>
      </IonContent>
    </Fragment>
  );
};

export default NoteOverview;
