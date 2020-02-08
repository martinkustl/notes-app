import React from 'react';

import { IonActionSheet } from '@ionic/react';

import classes from './ActionSheet.module.css';

import styled from 'styled-components';

const StyledIonActionSheet = styled(IonActionSheet)`
  --color: var(--ion-color-secondary);
  --background: var(--ion-color-primary);
  --background-activated: var(--ion-color-primary);
  --background-selected: var(--ion-color-primary);
  &.action-sheet-destructive {
    color: red !important;
  }
`;

const ActionSheet = ({
  showActionSheet,
  setShowActionSheet,
  setShowShareModal,
  handleDeleteNote
}) => {
  return (
    <StyledIonActionSheet
      isOpen={showActionSheet}
      onDidDismiss={() => setShowActionSheet(false)}
      className="actionSheet"
      buttons={[
        {
          text: 'Vymazat poznámku',
          role: 'destructive',
          cssClass: classes.deleteButton,
          handler: () => {
            console.log('Delete clicked');
            handleDeleteNote();
          }
        },
        {
          text: 'Sdílet',
          handler: () => {
            console.log('Share clicked');
            setShowShareModal(true);
          }
        },
        {
          text: 'Zrušit',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]}
    ></StyledIonActionSheet>
  );
};

export default ActionSheet;
