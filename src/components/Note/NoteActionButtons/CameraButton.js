import React, { useEffect } from 'react';
import { IonIcon, isPlatform, IonRippleEffect } from '@ionic/react';

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
  /* onPhotoUrlChange */ mode,
  note,
  noteId,
  noteText,
  handleNoteTextChange
}) => {
  useEffect(() => {
    /*     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log('I CAN ACCESS CAMERA');
      console.log(navigator.mediaDevices.getSupportedConstraints());
    } else {
      console.log('I CANNOT ACCESS CAMERA');
    } */
    /* console.log(isPlatform('mobile')); //can't take this whether we have a camera or not
    console.log(isPlatform('hybrid'));
    console.log(isPlatform('ios'));
    console.log(isPlatform('android'));
    console.log(isPlatform('desktop')); //good for check, because this is true only when I'm not in emulated mode */
    console.log(uuid());
    if (
      //check if this is desktop
      (isPlatform('mobile') && !isPlatform('hybrid')) ||
      isPlatform('desktop')
    ) {
      //happens when user is on desktop
    }
  }, []);

  const handleTakePhoto = () => {
    if (!Capacitor.isPluginAvailable('Camera')) {
      return console.log('Camera not available');
    } else {
      Plugins.Camera.getPhoto({
        quality: 50,
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
          // in case I can't take image
          console.log(error);
          return false;
        });
    }
  };

  const uploadPhoto = photo => {
    const ref = firebase.storage().ref(`images/${uuid()}.${photo.format}`);
    const uploadTask = ref.putString(`${photo.base64String}`, 'base64');

    uploadTask.on(
      'state_changed',
      snapshot => {},
      err => {
        console.log(err);
      },
      () => {
        console.log('Image uploaded');
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          let images;
          if (note.images) {
            images = `${note.images},${url}`;
          } else {
            images = url;
          }
          let submitNote;
          if (noteId.params) {
            submitNote = {
              id: noteId.params,
              heading: note.heading,
              content: noteText + `<img src="${url}" />`,
              images
            };
          } else {
            submitNote = {
              id: noteId.newId,
              heading: note.heading,
              content: noteText + `<img src="${url}" />`,
              images
            };
          }
          handleNoteTextChange(noteText + `<img src="${url}" />`);
          /* console.log({ ops: [...noteText, { insert: { image: url } }] });
          handleNoteTextChange(prevState => {
            return { ops: [...prevState, { insert: { image: url } }] };
          }); */
        });
      }
    );
  };

  return (
    <StyledCustomButton onClick={handleTakePhoto} className="ion-activatable">
      <IonIcon icon={camera} size="large" />
      {mode === 'android' && <IonRippleEffect type="bounded"></IonRippleEffect>}
    </StyledCustomButton>
  );
};

export default CameraButton;
