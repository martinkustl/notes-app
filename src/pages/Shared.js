import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonListHeader,
  IonItem,
  StyledCircle
} from '@ionic/react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import { StyledIonList } from '../styles';

import styled from 'styled-components';

const StyledCircleTwo = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: blue;
  margin-right: 0.4rem;
`;

const Shared = ({ notes }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Shared</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary">
        <StyledIonList color="primary">
          <IonListHeader color="primary">Nepřiřazené poznámky</IonListHeader>
          {notes &&
            notes.map((note, index) => {
              return (
                <IonItem
                  routerDirection="forward"
                  routerLink={`/shared/sharednote/${note.id}`}
                  key={index}
                  detail
                >
                  <StyledCircleTwo />
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
    notes: state.firestore.ordered.sharedNotes,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [
      {
        collection: 'notes',
        where: ['collaborators', 'array-contains', props.auth.email],
        orderBy: ['updatedAt', 'desc'],
        storeAs: 'sharedNotes'
      }
    ];
  })
)(Shared);
