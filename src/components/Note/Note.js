import React, { useState } from 'react';

import NoteActionButtons from '../NoteActionButtons/NoteActionButtons';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonBackButton,
  useIonViewWillEnter,
  useIonViewWillLeave,
  IonImg
} from '@ionic/react';

const Note = ({ onIsNoteOpenChange }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useIonViewWillEnter(() => {
    onIsNoteOpenChange(true);
  });

  useIonViewWillLeave(() => {
    onIsNoteOpenChange(false);
  });

  const onPhotoUrlChange = state => {
    setPhotoUrl(state);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" color="secondary" />
          </IonButtons>
          <IonTitle>Poznámka</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary" className="ion-padding" fullscreen>
        První poznámka
        {photoUrl && <IonImg src={photoUrl} />}
      </IonContent>
      <NoteActionButtons onPhotoUrlChange={onPhotoUrlChange} />
    </IonPage>
  );
};

export default Note;
