import React, { useState } from 'react';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonModal,
  IonButton,
  IonButtons,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonLoading,
  IonAlert
} from '@ionic/react';

import { create } from 'ionicons/icons';

import classes from './UserProfile.module.css';

import styled from 'styled-components';

const StyledIonlabel = styled(IonLabel)`
  --color: black;
  color: black !important;
`;

const StyledFormButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: var(--ion-color-primary);
  padding: 2rem 1rem 0 1rem;
`;

const StyledIonInput = styled(IonInput)`
  pointer-events: none;
`;

const StyledIonAlert = styled(IonAlert)`
  --background: var(--ion-color-primary);
`;

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const UserPofile = ({
  userName,
  userEmail,
  openProfile,
  setOpenProfile,
  handleSubmitProfileChange,
  isLoading,
  isError,
  errorMessage,
  handleConfirmErrorClick,
  handleDeleteAccount
}) => {
  const [editProfile, setEditProfile] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  let content = null;
  let responseComponent = null;
  let deleteAlert = null;

  if (isLoading && !isError) {
    responseComponent = <IonLoading isOpen={true} message="Provádím změny" />;
  } else if (isError) {
    responseComponent = (
      <StyledIonAlert
        isOpen={true}
        header="Chyba"
        message={errorMessage}
        onDidDismiss={() => handleConfirmErrorClick()}
        color="primary"
        backdropDismiss={false}
        buttons={[
          {
            text: 'Rozumím',
            cssClass: classes.alertButton,
            handler: () => handleConfirmErrorClick()
          }
        ]}
      />
    );
  }

  if (showDeleteAlert) {
    deleteAlert = (
      <StyledIonAlert
        isOpen={true}
        message="Opravdu chcete smazat váš účet?"
        onDidDismiss={() => setShowDeleteAlert(false)}
        color="primary"
        backdropDismiss={false}
        buttons={[
          {
            text: 'Ano',
            cssClass: classes.alertButtonDanger,
            handler: () => handleDeleteAccount()
          },
          {
            text: 'Ne',
            cssClass: classes.alertButton,
            handler: () => setShowDeleteAlert(false)
          }
        ]}
      />
    );
  }

  if (editProfile) {
    content = (
      <IonList className="ion-no-padding">
        <form
          onSubmit={e => {
            handleSubmitProfileChange(e);
            setEditProfile(false);
          }}
        >
          <IonItem lines="bottom">
            <StyledIonlabel position="stacked">Jméno</StyledIonlabel>
            <IonInput readonly={false} value={userName} name="name" />
          </IonItem>
          {/*          <IonItem lines="bottom">
            <StyledIonlabel position="stacked">Email</StyledIonlabel>
            <IonInput readonly={false} value={userEmail} name="email" />
          </IonItem> */}
          <StyledFormButtonsWrapper>
            <IonButton
              slot="start"
              expand="block"
              color="success"
              fill="outline"
              type="submit"
            >
              Potvrdit změny
            </IonButton>
            <IonButton
              slot="end"
              expand="block"
              color="danger"
              fill="outline"
              type="button"
              onClick={() => setEditProfile(false)}
            >
              Zrušit změny
            </IonButton>
          </StyledFormButtonsWrapper>
        </form>
      </IonList>
    );
  } else {
    content = (
      <IonList className="ion-no-padding">
        <IonItem lines="bottom">
          <IonLabel position="stacked">Jméno</IonLabel>
          <StyledIonInput readonly={true} value={userName} name="name" />
        </IonItem>
        <IonItem lines="bottom">
          <IonLabel position="stacked">Email</IonLabel>
          <StyledIonInput readonly={true} value={userEmail} name="email" />
        </IonItem>
      </IonList>
    );
  }

  const handleEditProfileChange = () => {
    setEditProfile(prevState => !prevState);
  };

  return (
    <IonModal
      isOpen={openProfile}
      animated={false}
      onDidDismiss={() => setOpenProfile(false)}
    >
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton
              type="button"
              onClick={() => setOpenProfile(false)}
              color="secondary"
            >
              Zpět
            </IonButton>
          </IonButtons>
          <IonTitle>Můj profil</IonTitle>
          <IonButtons slot="end">
            <IonButton
              type="button"
              onClick={handleEditProfileChange}
              color="secondary"
            >
              <IonIcon icon={create} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary">
        {content}
        {responseComponent}
        {deleteAlert}
      </IonContent>
      <StyledFooter>
        <IonButton
          expand="block"
          fill="clear"
          color="danger"
          onClick={() => setShowDeleteAlert(true)}
        >
          Zrušit účet
        </IonButton>
      </StyledFooter>
    </IonModal>
  );
};

export default UserPofile;
