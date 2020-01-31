import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { isPlatform } from '@ionic/react';

import CameraButton from './CameraButton';
import GalleryButton from './GalleryButton';

const StyledNoteCustomFooter = styled.footer`
  z-index: 99;
  height: 50px;
  width: 100%;
  display: flex;
  background-color: var(--ion-primary-color);
  border-top: 1px solid var(--ion-color-medium);
`;

const NoteActionButtons = ({ handleTakePhoto, handlePickGalleryPhoto }) => {
  const [mode, setMode] = useState();

  useEffect(() => {
    if (isPlatform('android')) {
      setMode('android');
    }
  }, []);

  return (
    <StyledNoteCustomFooter>
      <CameraButton mode={mode} handleTakePhoto={handleTakePhoto} />
      {/* <StyledCustomButton className="ion-activatable">
        <IonIcon icon={images} size="large" />
        {mode === 'android' && (
          <IonRippleEffect type="bounded"></IonRippleEffect>
        )}
      </StyledCustomButton> */}
      <GalleryButton
        mode={mode}
        handlePickGalleryPhoto={handlePickGalleryPhoto}
      />
    </StyledNoteCustomFooter>
  );
};

export default NoteActionButtons;
