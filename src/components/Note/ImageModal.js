import React, { useState, useEffect } from 'react';

import {
  IonModal,
  IonButton,
  IonToolbar,
  IonButtons,
  IonHeader,
  IonContent
} from '@ionic/react';

import styled from 'styled-components';

const StyledIonModal = styled(IonModal)`
  --background: black;
`;

const StyledToolbar = styled(IonToolbar)`
  --background: white;
`;

const StyledIonContent = styled(IonContent)`
  --background: ${props => `url(${props.imgurl}) center / contain no-repeat`};
`;

const ImageModal = ({ showImage, setShowImage, imageUrl, setImageUrl }) => {
  const [showToolbar, setShowToolbar] = useState(false);

  useEffect(() => {
    return () => {
      setShowToolbar(false);
    };
  }, [imageUrl]);

  const handleShowToolbar = () => {
    setShowToolbar(prevState => !prevState);
  };

  return (
    <StyledIonModal isOpen={showImage}>
      <IonHeader>
        {showToolbar && (
          <StyledToolbar>
            <IonButtons slot="start">
              <IonButton
                type="button"
                onClick={() => {
                  setShowImage(false);
                  setImageUrl();
                }}
                color="secondary"
              >
                Zavřít
              </IonButton>
            </IonButtons>
          </StyledToolbar>
        )}
      </IonHeader>
      <StyledIonContent
        fullscreen={true}
        imgurl={imageUrl}
        onClick={handleShowToolbar}
      ></StyledIonContent>
    </StyledIonModal>
  );
};

export default ImageModal;
