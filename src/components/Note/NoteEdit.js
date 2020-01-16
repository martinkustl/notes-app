import React, { useState, useEffect } from 'react';

import ReactQuill from 'react-quill';
//import 'react-quill/dist/quill.snow.module.css';

import {
  IonContent,
  IonInput,
  IonTextarea,
  useIonViewWillEnter
} from '@ionic/react';

import styled from 'styled-components';

const StyledIonInput = styled(IonInput)`
  font-size: 24px;
  margin-bottom: 15px;
`;

const StyledIonTextarea = styled(IonTextarea)``;

const NoteEdit = ({
  noteHeading,
  noteText,
  handleNoteHeadingChange,
  handleNoteTextChange,
  note
}) => {
  /*   console.log(noteText);
  console.log(noteHeading); */
  const [content, setContent] = useState();

  useEffect(() => {
    console.log('edit entered');
    /*   const imageArray = note.images.split(',');
    const separators = imageArray.map(image => `<img src="${image}" />`);
    let contentTextArray; */
    /*   console.log(note.content);
    console.log(note.content.indexOf(`<img src="${imageArray[0]}"`));
    console.log(note.content.indexOf('" />', 17));
    console.log(note.content.slice(27, 183)); */
    /* imageArray.forEach(image => {
      //console.log(image);
      //if (image === `<img src="${image}"`) {
      //  console.log('passed');
      //  updatedString = image;
      // } else {
      //  updatedString = note.content.replace(image, `<img src="${image}" />`);
      // }
      console.log(note.content);
      contentTextArray = note.content.split(`'${image}'`);
    }); */
    /* separators.forEach(separator => {
      const splittedString = note.content.split(separator);
      console.log(splittedString);
      console.log(splittedString[0]);
      console.log(splittedString[1]);
      console.log(`${separator}`);
      console.log(splittedString[0].search('<img'));
      if (splittedString[0].includes(`${separator}`)) {
        console.log('in first part');
      } else if (
        splittedString[1] &&
        splittedString[1].includes(`${separator}`)
      ) {
        console.log('in second part');
      } else {
        console.log('image is not in content');
      }
    }); */
  });

  /*  const findPhotos = note => {
    const imageArray = note.images.split(','); // find out the number of loops
    let updatedString;
    console.log(note.content);
    imageArray.forEach(image => {
      console.log(image);
      if (image === `<img src="${image}"`) {
        console.log('passed');
        updatedString = image;
      } else {
        updatedString = note.content.replace(image, `<img src="${image}" />`);
      }
    });

    console.log(updatedString);
    setNote({ ...note, content: updatedString });
  }; */
  const convertContentString = content => {
    /* const imageArray = note.images.split(','); // find out the number of loops
    let updatedString;
    console.log(note.content);
    imageArray.forEach(image => {
      console.log(image);
      if (image === `<img src="${image}"`) {
        console.log('passed');
        updatedString = image;
      } else {
        updatedString = note.content.replace(image, `<img src="${image}" />`);
      }
    });

    console.log(updatedString);
    setNote({ ...note, content: updatedString }); */
  };

  return (
    <IonContent className="ion-padding" color="primary" fullscreen={true}>
      <form>
        <StyledIonInput
          type="string"
          placeholder="Nadpis"
          value={noteHeading}
          name="heading"
          onIonChange={handleNoteHeadingChange}
          required={true}
          className="ion-no-padding"
        />
        {/* <StyledIonTextarea
          autoGrow={true}
          autofocus={true}
          spellCheck={true}
          autoCorrect
          value={noteText}
          onIonChange={handleNoteTextChange}
          name="textArea"
          placeholder="Obsah poznámky"
          required={true}
          className="ion-no-padding ion-no-margin"
        /> */}
        <ReactQuill value={noteText} onChange={handleNoteTextChange} />
        {/* <StyledIonTextarea
          autoGrow={true}
          autofocus={true}
          spellCheck={true}
          autoCorrect
          defaultValue={noteText}
          // onIonChange={handleNoteTextChange}
          name="textArea"
          placeholder="Obsah poznámky"
          required
          className="ion-no-padding ion-no-margin"
        /> */}
      </form>
    </IonContent>
  );
};

export default NoteEdit;
