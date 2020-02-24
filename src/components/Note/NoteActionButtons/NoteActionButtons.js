import React, { useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';

import { isPlatform, IonToolbar } from '@ionic/react';

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

const StyledOfflineMessage = styled.p`
  text-align: center;
  color: var(--ion-color-danger);
  margin: 0;
`;

const NoteActionButtons = ({
  handleTakePhoto,
  handlePickGalleryPhoto,
  connectionStatus
}) => {
  const [mode, setMode] = useState();

  useEffect(() => {
    if (isPlatform('android')) {
      setMode('android');
    }
  }, []);

  let content = null;

  if (connectionStatus.state === 'online') {
    content = (
      <Fragment>
        <CameraButton mode={mode} handleTakePhoto={handleTakePhoto} />
        <GalleryButton
          mode={mode}
          handlePickGalleryPhoto={handlePickGalleryPhoto}
        />
      </Fragment>
    );
  } else if (connectionStatus.state === 'offline') {
    content = (
      <IonToolbar color="primary">
        <StyledOfflineMessage>
          Jste offline. Pro pořízení a zobrazení fotek je nutné připojení k
          internetu.
        </StyledOfflineMessage>
      </IonToolbar>
    );
  }

  return <StyledNoteCustomFooter>{content}</StyledNoteCustomFooter>;
};

export default NoteActionButtons;
