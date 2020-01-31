import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonButton
} from '@ionic/react';
import React, { useState } from 'react';

import UserProfile from './UserPofile';

import { StyledIonList } from '../../styles';

import { useFirebase } from 'react-redux-firebase';

const HomeMenu = () => {
  const [openProfile, setOpenProfile] = useState(false);

  const firebase = useFirebase();

  const logoutClick = () => {
    firebase.logout();
  };

  const handleOpenProfile = () => {
    console.log('clicked');
    setOpenProfile(true);
  };

  return (
    <IonMenu contentId="main" type="overlay" color="primary">
      <IonHeader color="primary">
        <IonToolbar color="primary">
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary">
        <StyledIonList className="customizedList">
          <IonItem color="primary" onClick={handleOpenProfile}>
            Můj profil
          </IonItem>
        </StyledIonList>
        <IonButton color="danger" fill="clear" onClick={logoutClick}>
          Odhlásit
        </IonButton>
        <UserProfile
          openProfile={openProfile}
          setOpenProfile={setOpenProfile}
        />
      </IonContent>
    </IonMenu>
  );
};

export default HomeMenu;
