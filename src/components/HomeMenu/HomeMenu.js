import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonButton
} from '@ionic/react';
import React from 'react';
import { StyledIonList } from '../../styles';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

const HomeMenu = ({ onLogout }) => {
  const logoutClick = () => {
    onLogout();
  };

  return (
    <IonMenu contentId="main" type="overlay" color="primary">
      <IonHeader color="primary">
        <IonToolbar color="primary">
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary">
        <StyledIonList className="customizedList">
          <IonItem color="primary">Upravit barvy štítků</IonItem>
          <IonItem color="primary">Můj profil</IonItem>
        </StyledIonList>
        <IonButton color="danger" fill="clear" onClick={logoutClick}>
          Odhlásit
        </IonButton>
      </IonContent>
    </IonMenu>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actionCreators.logout())
  };
};

export default connect(null, mapDispatchToProps)(HomeMenu);
