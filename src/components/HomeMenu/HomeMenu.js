import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem
} from '@ionic/react';
import React from 'react';
import './HomeMenu.css';

const HomeMenu = () => {
  return (
    <IonMenu contentId="main" type="overlay" color="primary">
      <IonHeader color="primary">
        <IonToolbar color="primary">
          <IonTitle>Start Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary">
        <IonList className="customizedList">
          <IonItem color="primary">Menu Item</IonItem>
          <IonItem color="primary">Menu Item</IonItem>
          <IonItem color="primary">Menu Item</IonItem>
          <IonItem color="primary">Menu Item</IonItem>
          <IonItem color="primary">Menu Item</IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default HomeMenu;
