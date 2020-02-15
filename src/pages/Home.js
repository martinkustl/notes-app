import React from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import { isPlatform } from '@ionic/react';

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
  IonItemOption,
  IonLoading
} from '@ionic/react';

/* import { add, more } from 'ionicons/icons'; */

import { StyledIonList } from '../styles';

import styled from 'styled-components';

const StyledIonListHeader = styled(IonListHeader)`
  font-size: 17px;
  min-height: 0;
  height: 30px;
  line-height: 30px;
`;

const Home = ({ notes, firestore }) => {
  let notesList = (
    <IonLoading isOpen={!notes} message="Načítnání" backdropDismiss={true} />
  );
  if (notes && isPlatform('ios')) {
    notesList = (
      <StyledIonList color="primary">
        <StyledIonListHeader color="primary">Poznámky</StyledIonListHeader>
        {notes.map(note => {
          return (
            <IonItemSliding key={note.id}>
              <IonItem
                routerDirection="none"
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
    );
  } else if (notes) {
    notesList = (
      <StyledIonList color="primary">
        <StyledIonListHeader color="primary">Poznámky</StyledIonListHeader>
        {notes.map(note => {
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
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton
              color="secondary" /* autoHide={false} */
              /* menu="infoTabMenu" */
              /* menu="Main" */
              menu="mainMenu"
              /* autoHide={false} */
            ></IonMenuButton>
          </IonButtons>
          <IonTitle>Notes App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary">{notesList}</IonContent>
    </IonPage>
  );
};

const mapStateToProps = state => {
  return {
    notes: state.firestore.ordered.userNotes,
    auth: state.firebase.auth
  };
};
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
