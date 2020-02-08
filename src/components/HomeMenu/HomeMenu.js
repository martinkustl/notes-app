import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel
} from '@ionic/react';
import React, { useState } from 'react';

import UserProfile from './UserPofile';

import { StyledIonList } from '../../styles';

import { useFirebase } from 'react-redux-firebase';

import styled from 'styled-components';

const StyledMenuItem = styled(IonItem)`
  pointer-events: auto;
`;

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
    <IonMenu
      contentId="mainContent"
      type="overlay"
      color="primary"
      menuId="mainMenu"
      side="start"
    >
      <IonHeader color="primary">
        <IonToolbar color="primary">
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary" id="mainContent">
        <StyledIonList className="customizedList">
          <StyledMenuItem
            color="primary"
            button="true"
            type
            onClick={handleOpenProfile}
          >
            Můj profil
          </StyledMenuItem>
          <StyledMenuItem onClick={logoutClick} button="true">
            <IonLabel color="danger">Odhlásit</IonLabel>
          </StyledMenuItem>
        </StyledIonList>
        <UserProfile
          openProfile={openProfile}
          setOpenProfile={setOpenProfile}
        />
      </IonContent>
    </IonMenu>
  );
};

export default HomeMenu;
