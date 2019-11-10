import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/react';

const PrivateNotes = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Private notes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary"></IonContent>
    </IonPage>
  );
};

export default PrivateNotes;
