import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonListHeader,
  IonLabel,
  IonItem,
  IonIcon,
  IonButton
} from "@ionic/react";

import { add, more } from "ionicons/icons";

import styled from "styled-components";

import { StyledIonList } from "../styles";

import NewFolderModal from "../components/NewFolderModal/NewFolderModal";

const StyledOptionsButton = styled(IonButton)`
  --color: var(--ion-color-dark);
  --color-activated: var(--ion-color-secondary);
  --background-focused: var(--ion-color-secondary);
`;

const StyledCircle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: blue;
  margin-right: 0.4rem;
`;

const foldersArray = ["První složka", "Druhá složka", "Třetí složka"];

const notesArray = ["První poznámka", "Druhá poznámka", "Třetí poznámka"];

const Home = props => {
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Notes App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary">
        <StyledIonList color="primary">
          <IonListHeader color="primary">
            Složky
            <IonButton
              color="success"
              fill="clear"
              onClick={() => setShowNewFolderModal(true)}
            >
              <IonIcon icon={add} />
            </IonButton>
          </IonListHeader>
          <NewFolderModal
            showNewFolderModal={showNewFolderModal}
            onShowNewFolderModalChange={setShowNewFolderModal}
          />
          {foldersArray.map((folder, index) => {
            return (
              <IonItem color="primary" key={index}>
                <StyledCircle />
                <IonLabel>{folder}</IonLabel>
                <StyledOptionsButton fill="clear">
                  <IonIcon icon={more} />
                </StyledOptionsButton>
              </IonItem>
            );
          })}
        </StyledIonList>
        <StyledIonList color="primary">
          <IonListHeader color="primary">Nepřiřazené poznámky</IonListHeader>
          {notesArray.map((note, index) => {
            return (
              <IonItem
                color="primary"
                routerDirection="forward"
                routerLink="/note/:id"
                key={index}
                detail
              >
                <StyledCircle />
                {note}
              </IonItem>
            );
          })}
        </StyledIonList>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Home);
