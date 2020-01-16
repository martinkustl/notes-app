import React from 'react';

import { IonContent } from '@ionic/react';

import styled from 'styled-components';

const StyledNoteHeading = styled.h2`
  margin: 0;
  margin-bottom: 15px;
`;

const NoteOverview = ({ note, handleEditClick }) => {
  console.log(note);
  return (
    <IonContent
      color="primary"
      className="ion-padding"
      fullscreen={true}
      onClick={handleEditClick}
    >
      <StyledNoteHeading>{note.heading}</StyledNoteHeading>
      <div dangerouslySetInnerHTML={{ __html: note.content }}></div>
      {/* note.content */}
    </IonContent>
  );
};

export default NoteOverview;
