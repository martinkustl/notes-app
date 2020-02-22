import { IonList, IonTitle } from '@ionic/react';
import styled from 'styled-components';

export const StyledIonList = styled(IonList)`
  background-color: var(--ion-color-primary);
  padding-bottom: 20px;
`;

export const StyledIonTitle = styled(IonTitle)`
  &.ios {
    padding: 0;
  }
`;
