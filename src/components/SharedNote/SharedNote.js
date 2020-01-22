import React, { useState, Fragment } from 'react';

import { fetchNote } from '../../shared/utility';

import {
  IonPage,
  IonFooter,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonContent,
  useIonViewWillEnter
} from '@ionic/react';

import styled from 'styled-components';

const StyledNoteHeading = styled.h2`
  margin: 0;
  margin-bottom: 15px;
`;

const SharedNote = ({ match }) => {
  const [sharedNote, setSharedNote] = useState();

  useIonViewWillEnter(() => {
    if (match.params.id) {
      fetchNote(match.params.id).then(note => {
        setSharedNote(note);
      });
    }
  });

  let content;

  if (sharedNote) {
    content = (
      <Fragment>
        <StyledNoteHeading>{sharedNote.heading}</StyledNoteHeading>
        <div dangerouslySetInnerHTML={{ __html: sharedNote.content }}></div>
      </Fragment>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" color="secondary" />
          </IonButtons>
          <IonTitle>Cesta k poznámce</IonTitle>
          <IonButtons slot="end">
            <IonButton type="button" color="secondary">
              Uložit
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" color="primary" fullscreen={true}>
        {content}
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  );
};

export default SharedNote;
