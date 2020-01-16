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

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

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
  onUpdateNote
}) => {
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
        resultType: CameraResultType.Base64
      })
        .then(photo => {
          //onPhotoUrlChange(photo.dataUrl);
          console.log(photo);
          uploadPhoto(photo);
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

  const uploadPhoto = photo => {
    let ref = firebase.storage().ref(`images/test.${photo.format}`);

    let uploadTask = ref.putString(`${photo.base64String}`, 'base64');

    uploadTask.on(
      'state_changed',
      snapshot => {
        console.log(snapshot);
      },
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
          const submitNote = {
            id: noteId,
            heading: note.heading,
            content: note.content + `<img src="${url}" />`,
            images
          };
          onUpdateNote(submitNote);
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

const mapDispatchToProps = dispatch => {
  return {
    onUpdateNote: note => dispatch(actionCreators.updateNote(note))
  };
};

/* export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    if (props.match.params.id) {
      return [
        { collection: 'notes', doc: props.match.params.id, storeAs: 'note' }
      ];
    } else {
      return [];
    }
  })
)(Note); */

export default connect(null, mapDispatchToProps)(CameraButton);
