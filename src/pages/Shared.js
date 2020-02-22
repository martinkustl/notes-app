import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonListHeader,
  IonItem
} from '@ionic/react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import { StyledIonList, StyledIonTitle } from '../styles';

import styled from 'styled-components';

const StyledIonListHeader = styled(IonListHeader)`
  font-size: 17px;
  min-height: 0;
  height: 30px;
  line-height: 30px;
`;

const Shared = ({ notes }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <StyledIonTitle>Sdílené poznámky</StyledIonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary">
        <StyledIonList color="primary">
          <StyledIonListHeader color="primary">Poznámky</StyledIonListHeader>
          {notes &&
            notes.map((note, index) => {
              return (
                <IonItem
                  routerDirection="forward"
                  /* routerLink={`/shared/sharednote/${note.id}`} */
                  routerLink={`/shared/sharednote/${note.id}`}
                  key={index}
                  detail
                >
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
