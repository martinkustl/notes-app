import React from 'react';
import { IonIcon, IonRippleEffect } from '@ionic/react';

import styled from 'styled-components';
import { camera } from 'ionicons/icons';
import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType
} from '@capacitor/core';

import uuid from 'uuid/v4';

import * as firebase from 'firebase';

const StyledCustomButton = styled.button`
  height: 100%;
  background-color: var(--ion-color-primary);
  color: var(--ion-color-secondary);
  width: 100%;
  position: relative;
  opacity: 1;
  &:active {
    outline: none;
    opacity: 0.5;
    transition: opacity 0.2s ease-in;
  }
  &:focus {
    outline: none;
  }
`;

const CameraButton = ({
  mode,
  cursorPosition,
  quillRef,
  setUploadingImage
}) => {
  const handleTakePhoto = () => {
    if (!Capacitor.isPluginAvailable('Camera')) {
      return console.error('Camera not available');
    } else {
      Plugins.Camera.getPhoto({
        quality: 90,
        source: CameraSource.Camera,
        correctOrientation: true,
        height: 320,
        width: 200,
        resultType: CameraResultType.Base64
      })
        .then(photo => {
          uploadPhoto(photo);
        })
        .catch(error => {
          console.error(error);
          return false;
        });
    }
  };

  const uploadPhoto = photo => {
    const ref = firebase.storage().ref(`images/${uuid()}.${photo.format}`);
    const uploadTask = ref.putString(`${photo.base64String}`, 'base64');
    uploadTask.on(
      'state_changed',
      snapshot => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadingImage({ isOpen: true, percentage: percentage });
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('Image uploaded');
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          insertPhotoToNote(url);
          console.log(url);
          setUploadingImage({ isOpen: false, percentage: null });
        });
      }
    );
  };

  const insertPhotoToNote = url => {
    if (cursorPosition || cursorPosition === 0) {
      quillRef.current.getEditor().insertEmbed(cursorPosition, 'image', url);
    } else {
      quillRef.current
        .getEditor()
        .insertEmbed(quillRef.current.getEditor().getLength(), 'image', url);
    }
  };

  return (
    <StyledCustomButton onClick={handleTakePhoto} className="ion-activatable">
      <IonIcon icon={camera} size="large" />
      {mode === 'android' && <IonRippleEffect type="bounded"></IonRippleEffect>}
    </StyledCustomButton>
  );
};

export default CameraButton;
