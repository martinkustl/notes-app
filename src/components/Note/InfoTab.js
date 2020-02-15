import React from 'react';

import styled from 'styled-components';

import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonListHeader
} from '@ionic/react';

const StyledIonListHeader = styled(IonListHeader)`
  font-size: 16px;
  padding-bottom: 0;
  margin-bottom: 0;
  font-weight: bold;
`;

const StyledDateLabel = styled.span`
  font-size: 13px;
  color: #3b3b3b;
`;

const InfoTab = ({ note }) => {
  let collabList = null;

  const convertToDateTime = seconds => {
    //var t = new Date(1970, 0, 1); // Epoch
    const t = new Date(seconds * 1000);
    // t.setSeconds(seconds * 1000);
    return `${t.getDate()}.${t.getMonth() +
      1}.${t.getFullYear()} v ${t.getHours()}:${t.getMinutes()} `;
  };

  if (note.collaborators) {
    collabList = (
      <IonList color="primary" className="ion-no-padding ion-margin-top">
        <StyledIonListHeader color="primary">Sdíleno s</StyledIonListHeader>
        {note.collaborators.map((collaborator, index) => (
          <IonItem key={index}>{collaborator}</IonItem>
        ))}
      </IonList>
    );
  }

  return (
    <IonMenu
      contentId="infoTabContent"
      menuId="infoTabMenu"
      side="end"
      color="primary"
      type="overlay"
    >
      <IonHeader color="primary">
        <IonToolbar color="primary">
          <IonTitle className="ion-no-padding">Informace o poznámce</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="infoTabContent" color="primary">
        <IonList className="ion-no-padding">
          <IonItem>
            <IonLabel>
              {convertToDateTime(note.createdAt.seconds)}
              <br />
              <StyledDateLabel>Datum vytvoření</StyledDateLabel>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              {convertToDateTime(note.updatedAt.seconds)}
              <br />
              <StyledDateLabel>Datum poslední úpravy</StyledDateLabel>
            </IonLabel>
          </IonItem>
        </IonList>
        {collabList}
      </IonContent>
    </IonMenu>
  );
};

export default InfoTab;
