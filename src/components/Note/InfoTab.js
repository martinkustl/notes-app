import React from 'react';

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

const InfoTab = ({ note }) => {
  /* function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}
 */
  const convertToDateTime = seconds => {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(seconds);
    return t.toString();
  };

  return (
    <IonMenu
      /* menuId="infoTab" */
      /* isOpen={() => showInfoTab()} */
      contentId="infoTabContent"
      menuId="infoTabMenu"
      side="end"
      color="primary"
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Informace o poznámce</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="infoTabContent">
        <IonList>
          <IonItem>
            <IonLabel>{convertToDateTime(note.createdAt.seconds)}</IonLabel>
          </IonItem>
        </IonList>
        <IonList>
          <IonListHeader>Sdíleno s</IonListHeader>
          {note.collaborators.map((collaborator, index) => (
            <IonItem key={index}>{collaborator}</IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default InfoTab;
