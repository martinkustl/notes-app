import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { IonIcon, IonRippleEffect, isPlatform } from '@ionic/react';

import { microphone, images } from 'ionicons/icons';

import CameraButton from './CameraButton';

const StyledNoteCustomFooter = styled.footer`
  /* position: absolute;
  bottom: 0;
  left: 0; */
  z-index: 99;
  height: 50px;
  width: 100%;
  display: flex;
  background-color: var(--ion-primary-color);
  border-top: 1px solid var(--ion-color-medium);
`;

const StyledCustomButton = styled.button`
  height: 100%;
  background-color: var(--ion-color-primary);
  color: var(--ion-color-secondary);
  width: 100%;
  padding: 0;
  opacity: 1;
  position: relative;
  overflow: hidden;
  &:active {
    outline: none;
    opacity: 0.5;
    transition: opacity 0.2s ease-in;
  }
  &:focus {
    outline: none;
  }
`;

const NoteActionButtons = (
  {
    /* onPhotoUrlChange */
  }
) => {
  const [mode, setMode] = useState();

  useEffect(() => {
    if (isPlatform('android')) {
      setMode('android');
    }
  }, []);

  return (
    <StyledNoteCustomFooter>
      <CameraButton /* onPhotoUrlChange={onPhotoUrlChange} */ mode={mode} />
      <StyledCustomButton className="ion-activatable">
        <IonIcon icon={images} size="large" />
        {mode === 'android' && (
          <IonRippleEffect type="bounded"></IonRippleEffect>
        )}
      </StyledCustomButton>
      {/*  <StyledCustomButton className="ion-activatable">
        <IonIcon icon={microphone} size="large" />
        {mode === 'android' && (
          <IonRippleEffect type="bounded"></IonRippleEffect>
        )}
      </StyledCustomButton> */}
    </StyledNoteCustomFooter>
  );
};

export default NoteActionButtons;
