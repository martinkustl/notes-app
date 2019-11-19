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
  IonImg,
  IonFooter
} from '@ionic/react';

const Note = ({ onIsNoteOpenChange }) => {
  const [photoUrl, setPhotoUrl] = useState();
  const [hideActionButtons, setHideActionButtons] = useState(false);

  useIonViewWillEnter(() => {
    onIsNoteOpenChange(true);
  });

  useIonViewWillLeave(() => {
    setHideActionButtons(false);
    // onIsNoteOpenChange(false);
    try {
      setTimeout(() => {
        onIsNoteOpenChange(false);
      }, 400);
    } catch (err) {}
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
      <IonContent color="primary" /* className="ion-padding"  */ fullscreen>
        První poznámka
        {photoUrl && <IonImg src={photoUrl} />}
      </IonContent>
      <IonFooter>
        {!hideActionButtons && (
          <NoteActionButtons onPhotoUrlChange={onPhotoUrlChange} />
        )}
      </IonFooter>
    </IonPage>
  );
};

export default Note;
