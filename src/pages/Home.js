import React, { useState } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import * as actionCreators from '../store/actions/index';

import { trash } from 'ionicons/icons';

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
  IonItemSliding,
  IonItemOptions,
  IonItemOption
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

const Home = ({ notes, auth, onDeleteNote }) => {
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
            notes.map(note => {
              return (
                <IonItemSliding key={note.id}>
                  <IonItem
                    routerDirection="forward"
                    routerLink={`/note/usernote/${note.id}`}
                    detail
                  >
                    <StyledCircle />
                    {note.heading}
                  </IonItem>
                  <IonItemOptions>
                    <IonItemOption
                      color="danger"
                      onClick={() => onDeleteNote(note.id)}
                    >
                      <IonIcon icon={trash} size="medium" />
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              );
            })}
        </StyledIonList>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = state => {
  return {
    notes: state.firestore.ordered.userNotes,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteNote: id => dispatch(actionCreators.deleteNote(id))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return [
      {
        collection: 'notes',
        where: ['ownerId', '==', props.auth.uid],
        orderBy: ['updatedAt', 'desc'],
        storeAs: 'userNotes'
      }
    ];
  })
)(Home);
