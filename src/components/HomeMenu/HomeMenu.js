import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonButton
} from '@ionic/react';
import React from 'react';
import { StyledIonList } from '../../styles';

const HomeMenu = () => {
  return (
    <IonMenu contentId="main" type="overlay" color="primary">
      <IonHeader color="primary">
        <IonToolbar color="primary">
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary">
        <StyledIonList className="customizedList">
          <IonItem color="primary">Upravit barvy štítků</IonItem>
          <IonItem color="primary">Můj profil</IonItem>
        </StyledIonList>
        <IonButton color="danger" fill="clear">
          Odhlásit
        </IonButton>
      </IonContent>
    </IonMenu>
  );
};

export default HomeMenu;
