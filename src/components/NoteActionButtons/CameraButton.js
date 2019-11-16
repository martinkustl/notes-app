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

const CameraButton = ({ onPhotoUrlChange, mode }) => {
  // const [photoUrl, setPhotoUrl] = useState();
  //const [cameraAccessible, setCameraAccessible] = useState(true);
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
        resultType: CameraResultType.DataUrl
      })
        .then(photo => {
          onPhotoUrlChange(photo.dataUrl);
        })
        .catch(error => {
          // in case I can't take image
          console.log(error);
          return false;
        });
    }
    /*if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { width: 1280, height: 720 } })
        .then(stream => (videoRef.current.srcObject = stream))
        .catch(err => console.log('ERROR' + err)); 
    }*/
  };

  return (
    <StyledCustomButton onClick={handleTakePhoto} className="ion-activatable">
      <IonIcon icon={camera} size="large" />
      {mode === 'android' && <IonRippleEffect type="bounded"></IonRippleEffect>}
    </StyledCustomButton>
  );
};

export default CameraButton;
