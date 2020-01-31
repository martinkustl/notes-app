import React from 'react';

import { IonIcon, IonRippleEffect } from '@ionic/react';

import { images } from 'ionicons/icons';

import { StyledCustomButton } from './styles';

const GalleryButton = ({ mode, handlePickGalleryPhoto }) => {
  return (
    <StyledCustomButton
      className="ion-activatable"
      onClick={handlePickGalleryPhoto}
    >
      <IonIcon icon={images} size="large" />
      {mode === 'android' && <IonRippleEffect type="bounded"></IonRippleEffect>}
    </StyledCustomButton>
  );
};

export default GalleryButton;
