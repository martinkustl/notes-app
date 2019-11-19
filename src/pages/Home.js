import React, { useState } from 'react';

import * as firebase from 'firebase';

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
  IonButton,
  useIonViewWillEnter
} from '@ionic/react';

import { add, more } from 'ionicons/icons';

import styled from 'styled-components';

import { StyledIonList } from '../styles';

import NewFolderModal from '../components/NewFolderModal/NewFolderModal';

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

const Home = () => {
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);

  useIonViewWillEnter(() => {
    let fetchedNotes = [];
    let fetchedFolders = [];
    // UNCOMMENT FOR FETCHING NOTES & FOLDERS
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => fetchedNotes.push(doc.data()));
        setNotes([...fetchedNotes]);
        fetchedNotes = [];
      });
    firebase
      .firestore()
      .collection('folders')
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => fetchedFolders.push(doc.data()));
        setFolders([...fetchedFolders]);
        fetchedFolders = [];
      });
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton color="secondary" />
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
          {folders &&
            folders.map((folder, index) => {
              return (
                <IonItem key={index}>
                  <StyledCircle />
                  <IonLabel>{folder.name}</IonLabel>
                  <StyledOptionsButton fill="clear">
                    <IonIcon icon={more} />
                  </StyledOptionsButton>
                </IonItem>
              );
            })}
        </StyledIonList>
        <StyledIonList color="primary">
          <IonListHeader color="primary">Nepřiřazené poznámky</IonListHeader>
          {notes &&
            notes.map((note, index) => {
              return (
                <IonItem
                  routerDirection="forward"
                  routerLink="/note/:id"
                  key={index}
                  detail
                >
                  <StyledCircle />
                  {note.text}
                </IonItem>
              );
            })}
        </StyledIonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
