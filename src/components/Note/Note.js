import React from 'react';
import styled from 'styled-components';

import { microphone, camera, images } from 'ionicons/icons';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonBackButton,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  useIonViewWillEnter,
  useIonViewWillLeave
} from '@ionic/react';

const StyledIonSegment = styled(IonSegment)`
  position: absolute;
  bottom: 0;
  height: 50px;
`;

const StyledIonSegmentButton = styled(IonSegmentButton)`
  --background: var(--ion-color-primary);
  --color: var(--ion-color-primary-contrast);
  --border-color: var(--ion-color-medium);
  --color-activated: var(--ion-color-secondary);
  /* --color-checked: var(--ion-color-secondary); */
  border: none;
  --border-radius: 0;
  border-top: 1px solid black;
`;

const Note = ({ onIsNoteOpenChange }) => {
  useIonViewWillEnter(() => {
    onIsNoteOpenChange(true);
  });

  useIonViewWillLeave(() => {
    onIsNoteOpenChange(false);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Poznámka</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary">
        První poznámka
        <StyledIonSegment>
          <StyledIonSegmentButton>
            <IonIcon icon={camera} size="large" />
          </StyledIonSegmentButton>
          <StyledIonSegmentButton>
            <IonIcon icon={images} size="large" />
          </StyledIonSegmentButton>
          <StyledIonSegmentButton>
            <IonIcon icon={microphone} size="large" />
          </StyledIonSegmentButton>
        </StyledIonSegment>
      </IonContent>
    </IonPage>
  );
};

export default Note;
