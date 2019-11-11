import React from 'react';
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonSearchbar,
  IonItem
} from '@ionic/react';

import { StyledIonList } from '../styles';

const Search = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Private notes</IonTitle>
        </IonToolbar>
        <IonToolbar color="primary">
          <IonSearchbar placeholder="Hledat" color="tertiary"></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary">
        <StyledIonList>
          <IonItem color="primary">První search item</IonItem>
          <IonItem color="primary">Druhý search item</IonItem>
        </StyledIonList>
      </IonContent>
    </IonPage>
  );
};

export default Search;
