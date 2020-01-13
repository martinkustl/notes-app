import React, { useState } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

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

const Home = ({ notes }) => {
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  // const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);

  /* const onOpenNewFolderModal = state => {
    setShowNewFolderModal(state);
  }; */
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
              onClick={() => {
                setShowNewFolderModal(true);
              }}
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
                  routerLink={`/note/${note.id}`}
                  key={index}
                  detail
                >
                  <StyledCircle />
                  {note.heading}
                </IonItem>
              );
            })}
        </StyledIonList>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = state => {
  return {
    notes: state.firestore.ordered.notes,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [{ collection: 'notes', where: ['ownerId', '==', props.auth.uid] }];
  })
)(Home);
