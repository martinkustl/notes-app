import React from 'react';

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
  IonLabel
} from '@ionic/react';
import { connect } from 'react-redux';

import { create } from 'ionicons/icons';

const UserPofile = ({ userName, userEmail, openProfile, setOpenProfile }) => {
  return (
    <IonModal isOpen={openProfile}>
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
            {/* <IonButton
              type="button"
              // onClick={() => setEditShareList(prevState => !prevState)}
              color="secondary"
            >
              <IonIcon icon={create} />
            </IonButton> */}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary">
        <IonList className="ion-no-padding">
          <IonItem lines="none">
            <IonLabel>
              Jméno:
              {userName}
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            Email:
            <IonLabel>{userEmail}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};

const mapStateToProps = state => {
  return {
    userEmail: state.firebase.auth.email,
    userName: state.firebase.profile.userName
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
/*   export default compose(
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
  )(UserPofile); */

export default connect(mapStateToProps, null)(UserPofile);
