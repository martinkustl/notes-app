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

import { connect } from 'react-redux';

import UserProfile from './UserPofile';

import { StyledIonList } from '../../styles';

import { useFirebase, useFirestore } from 'react-redux-firebase';

import useErrorMessage from '../../shared/useErrorMessage';

import styled from 'styled-components';

const StyledMenuItem = styled(IonItem)`
  pointer-events: auto;
`;

const HomeMenu = ({ userEmail, userName, uid }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const firebase = useFirebase();
  const firestore = useFirestore();
  const {
    isError,
    errorMessage,
    setErrorMessage,
    handleClearError
  } = useErrorMessage();

  const handleSubmitProfileChange = e => {
    e.preventDefault();
    const newName = e.target.name.value;
    const newEmail = e.target.email.value;
    if (newEmail !== userEmail || newName !== userName) {
      setIsLoading(true);
    }

    if (newEmail !== userEmail && newName !== userName) {
      const emailPromise = firebase.updateEmail(newEmail, true);
      const namePromise = firestore.update(
        { collection: 'users', doc: uid },
        { userName: newName }
      );
      Promise.all([emailPromise, namePromise])
        .then(res => {
          setIsLoading(false);
        })
        .catch(err => setErrorMessage(err));
    } else if (newEmail !== userEmail) {
      firebase
        .updateEmail(newEmail, true)
        .then(() => setIsLoading(false))
        .catch(err => {
          setErrorMessage(err);
        });
    } else if (newName !== userName) {
      firestore
        .update({ collection: 'users', doc: uid }, { userName: newName })
        .then(() => setIsLoading(false));
    }
  };

  const handleConfirmErrorClick = () => {
    setIsLoading(false);
    handleClearError();
  };

  const logoutClick = () => {
    firebase.logout();
  };

  const handleOpenProfile = () => {
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
          handleSubmitProfileChange={handleSubmitProfileChange}
          userEmail={userEmail}
          userName={userName}
          isLoading={isLoading}
          isError={isError}
          errorMessage={errorMessage}
          handleConfirmErrorClick={handleConfirmErrorClick}
        />
      </IonContent>
    </IonMenu>
  );
};

const mapStateToProps = state => {
  return {
    userEmail: state.firebase.profile.email,
    uid: state.firebase.auth.uid,
    userName: state.firebase.profile.userName
  };
};

export default connect(mapStateToProps, null)(HomeMenu);
