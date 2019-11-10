import React from 'react';
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent
} from '@ionic/react';

const Search = () => {
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

export default Search;
