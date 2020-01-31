import React from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

/* import * as actionCreators from '../store/actions/index';
 */
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
  IonItem,
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from '@ionic/react';

/* import { add, more } from 'ionicons/icons'; */

import { StyledIonList } from '../styles';

import styled from 'styled-components';

/* import NewFolderModal from '../components/NewFolderModal/NewFolderModal';
 */
/* const StyledOptionsButton = styled(IonButton)`
  --color: var(--ion-color-dark);
  --color-activated: var(--ion-color-secondary);
  --background-focused: var(--ion-color-secondary);
`;
 */

const StyledIonListHeader = styled(IonListHeader)`
  font-size: 17px;
  min-height: 0;
  height: 30px;
  line-height: 30px;
`;

const Home = ({ notes, firestore }) => {
  /*  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  // const [notes, setNotes] = useState([]); */
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
        {/* <StyledIonList color="primary">
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
        </StyledIonList> */}
        <StyledIonList color="primary">
          <StyledIonListHeader color="primary">Poznámky</StyledIonListHeader>
          {notes &&
            notes.map(note => {
              return (
                <IonItemSliding key={note.id}>
                  <IonItem
                    routerDirection="forward"
                    routerLink={`/note/usernote/${note.id}`}
                    detail
                  >
                    {note.heading}
                  </IonItem>
                  <IonItemOptions>
                    <IonItemOption
                      color="danger"
                      onClick={() =>
                        firestore.delete({
                          collection: 'notes',
                          doc: note.id
                        })
                      }
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
/* 
const mapDispatchToProps = dispatch => {
  return {
    onDeleteNote: id => dispatch(actionCreators.deleteNote(id))
    //onDeleteNote: id => dispatch()
  };
};
 */
export default compose(
  connect(mapStateToProps, null),
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
