import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/react';

const Shared = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Shared</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary"></IonContent>
    </IonPage>
  );
};

export default Shared;
