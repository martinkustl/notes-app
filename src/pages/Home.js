import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon
} from '@ionic/react';
import { menu } from 'ionicons/icons';
import React from 'react';

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon slot="icon-only" name="menu" icon={menu}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Notes App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>Home</h1>
      </IonContent>
    </IonPage>
  );
};

export default Home;
