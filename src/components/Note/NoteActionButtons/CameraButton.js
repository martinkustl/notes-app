import React from 'react';
import { IonIcon, IonRippleEffect } from '@ionic/react';

import { camera } from 'ionicons/icons';

import { StyledCustomButton } from './styles';

const CameraButton = ({ mode, handleTakePhoto }) => {
  return (
    <StyledCustomButton onClick={handleTakePhoto} className="ion-activatable">
      <IonIcon icon={camera} size="large" />
      {mode === 'android' && <IonRippleEffect type="bounded"></IonRippleEffect>}
    </StyledCustomButton>
  );
};

export default CameraButton;
