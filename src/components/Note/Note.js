import React, { useState, useEffect, useCallback, useRef } from 'react';

import { connect } from 'react-redux';

import * as firebase from 'firebase';

import { debounce, fetchNote } from '../../shared/utility';

import { create } from 'ionicons/icons';

import ReactQuill, { Quill } from 'react-quill';

import NoteActionButtons from './NoteActionButtons/NoteActionButtons';
import ActionSheet from './ActionSheet';
import ShareModal from './ShareModal';
import ImageModal from './ImageModal';

import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import {
  IonPage,
  useIonViewWillEnter,
  useIonViewWillLeave,
  IonFooter,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonContent,
  IonInput,
  IonProgressBar,
  IonModal,
  IonList,
  IonListHeader,
  IonLabel
} from '@ionic/react';

import styled from 'styled-components';

const StyledIonInput = styled(IonInput)`
  font-size: 24px;
  margin-bottom: 15px;
`;

const StyledReactQuill = styled(ReactQuill)`
  &.quill-editor {
    font-size: 30px;
  }
`;

const StyledUploadImageModal = styled(IonModal)`
  --max-height: 20vh;
  --max-width: 50vw;
  --min-width: 210px;
  --min-height: 150px;
  /* --height: auto; */
`;

const StyledUploadProgressDiv = styled.div`
  height: 20vh;
  width: 50vw;
  min-height: 150px;
  min-width: 210px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--ion-color-primary);
`;

const imageOnClick = Quill.import('formats/image');
imageOnClick.className = 'clickableImage';
Quill.register(imageOnClick);

const Note = ({
  onIsNoteOpenChange,
  match,
  isNewNote,
  uid,
  ownerName,
  firestore
}) => {
  const [note, setNote] = useState(false);
  const [noteHeading, setNoteHeading] = useState('');
  const [noteText, setNoteText] = useState('');
  const [isNew, setIsNew] = useState({ boolean: isNewNote, id: null });
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const quillRef = useRef(null);
  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [uploadingImage, setUploadingImage] = useState({
    isOpen: false,
    percentage: null
  });

  useIonViewWillEnter(() => {
    try {
      setTimeout(() => {
        onIsNoteOpenChange(true);
      }, 301);
    } catch (err) {
      console.error(err);
    }
  });

  const modules = {
    clipboard: {
      matchVisual: false
    }
  };

  useEffect(() => {
    if (match.params.id) {
      firebase
        .firestore()
        .collection('notes')
        .doc(match.params.id)
        .onSnapshot(doc => {
          setNote({ ...doc.data(), id: match.params.id });
        });
    } else if (isNew.id) {
      firebase
        .firestore()
        .collection('notes')
        .doc(isNew.id)
        .onSnapshot(doc => {
          setNote({ ...doc.data(), id: isNew.id });
        });
    }
  }, [match.params.id, isNew, firestore]);

  /* useEffect(() => {
    if (location.state.userNote) {
      setNote({ ...location.state.userNote });
    }
  }, [location.state.userNote, firestore]); */

  useEffect(() => {
    // console.log(quillRef.current.getEditor());
    if (quillRef.current && note) {
      const quillHTML = quillRef.current.getEditor().root.innerHTML;
      console.log(quillHTML);
      console.log(note.content);
      if (quillHTML === note.content) {
        console.log('Database and user content are equal');
      } else {
        console.log('Database and user content are not equal');
        // console.log()
        setNoteHeading(note.heading);
        setNoteText(note.content);
        quillRef.current
          .getEditor()
          .clipboard.dangerouslyPasteHTML(note.content);
      }
    }
    if (note && quillRef.current === null) {
      setNoteHeading(note.heading);
      setNoteText(note.content);
    }
    /* if (note) {
      setNoteHeading(note.heading);
      setNoteText(note.content);
    } */
  }, [note]);

  useEffect(() => {
    const images = document.querySelectorAll('.clickableImage');
    if (images.length > 0) {
      images.forEach(item => {
        item.addEventListener('click', handleImageClick);
      });
    }
  });

  useIonViewWillLeave(() => {
    try {
      setTimeout(() => {
        onIsNoteOpenChange(false);
      }, 300);
    } catch (err) {}
    //onIsNoteOpenChange(false);
  });

  const handleSubmitNote = useCallback(
    debounce((heading, content, note, uid, ownerName, isNew, params) => {
      let submitNote;
      if (isNew.boolean) {
        console.log('submited');
        submitNote = {
          heading: heading,
          content: content
        };
        firestore
          .add(
            { collection: 'notes' },
            {
              ...note,
              ownerId: uid,
              ownerName,
              content: submitNote.content,
              createdAt: new Date(),
              updatedAt: new Date(),
              heading: submitNote.heading
            }
          )
          .then(docRef => {
            setIsNew({ boolean: false, id: docRef.id });
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        if (params) {
          submitNote = {
            id: params,
            heading: heading,
            content: content
            /*  updatedAt: new Date() */
          };
        } else if (note.id) {
          submitNote = {
            id: note.id,
            heading: heading,
            content: content
            /*   updatedAt: new Date() */
          };
        } else {
          console.error('Error note id unassigned');
        }
        firestore.update(
          { collection: 'notes', doc: submitNote.id },
          submitNote
        );
      }
    }, 1500),
    []
  );

  // IMAGES
  const getAllImages = str => {
    let regex = new RegExp('<img .*?src="(.*?)"', 'gi'),
      result,
      res = [];
    while ((result = regex.exec(str))) {
      res.push(result[1]);
    }
    return res;
  };

  const deleteImageFromFirebase = imageUrl => {
    const imageRef = firebase.storage().refFromURL(imageUrl);
    imageRef
      .delete()
      .then(() => {
        console.log('image deleted from firebase');
      })
      .catch(error => {
        console.log('Problem during image delete');
        console.error(error);
      });
  };

  const handleImageClick = e => {
    setShowImage(true);
    setImageUrl(e.toElement.src);
    quillRef.current.blur();
  };

  const updateNoteShare = share => {
    firestore.update({ collection: 'notes', doc: share.id }, share);
  };

  // QUILL CONTENT
  const handleSelectionChange = range => {
    if (range) {
      setCursorPosition(range.index);
    }
  };

  const handleNoteHeadingChange = e => {
    setNoteHeading(e.target.value);
    if (e.target.value && noteText) {
      handleSubmitNote(
        e.target.value,
        noteText,
        note,
        uid,
        ownerName,
        isNew,
        match.params.id
      );
    }
  };

  const handleNoteTextChange = content => {
    if (noteText !== '') {
      const newImageArray = getAllImages(content);
      const oldImageArray = getAllImages(noteText);
      if (oldImageArray.length > newImageArray.length) {
        const deletedImages = oldImageArray.filter(
          image => !newImageArray.includes(image)
        );
        deletedImages.forEach(image => {
          deleteImageFromFirebase(image);
        });
      }
    }
    setNoteText(content);
    if (noteHeading && content) {
      handleSubmitNote(
        noteHeading,
        content,
        note,
        uid,
        ownerName,
        isNew,
        match.params.id
      );
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" color="secondary" />
          </IonButtons>
          {/* <IonTitle>Cesta k poznámce</IonTitle> */}
          <IonButtons slot="end">
            <IonButton
              type="button"
              onClick={() => setShowActionSheet(true)}
              color="secondary"
            >
              <IonIcon icon={create} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
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
          {(noteText || isNew) && (
            <StyledReactQuill
              defaultValue={noteText}
              onChange={handleNoteTextChange}
              onChangeSelection={handleSelectionChange}
              ref={quillRef}
              modules={modules}
            />
          )}
        </form>
        <ActionSheet
          showActionSheet={showActionSheet}
          setShowActionSheet={setShowActionSheet}
          setShowShareModal={setShowShareModal}
        />
        <ShareModal
          showShareModal={showShareModal}
          setShowShareModal={setShowShareModal}
          note={note}
          setNote={setNote}
          updateNoteShare={updateNoteShare}
        />
        <ImageModal
          showImage={showImage}
          setShowImage={setShowImage}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
        <StyledUploadImageModal
          isOpen={uploadingImage.isOpen}
          backdropDismiss={false}
        >
          <StyledUploadProgressDiv color="primary">
            <IonList color="primary" className="ion-no-padding">
              <IonListHeader color="primary">
                <IonLabel>
                  {`Ukládám obrázek ${uploadingImage.percentage}%`}
                </IonLabel>
              </IonListHeader>
              <IonProgressBar
                value={uploadingImage.percentage}
                color="secondary"
              ></IonProgressBar>
            </IonList>
            <IonButton
              color="danger"
              fill="clear"
              onClick={() =>
                setUploadingImage({ isOpen: false, percentage: null })
              }
            >
              Zrušit nahrávání
            </IonButton>
          </StyledUploadProgressDiv>
        </StyledUploadImageModal>
      </IonContent>
      <IonFooter>
        <NoteActionButtons
          cursorPosition={cursorPosition}
          quillRef={quillRef}
          setUploadingImage={setUploadingImage}
        />
      </IonFooter>
    </IonPage>
  );
};

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
    ownerName: state.firebase.profile.userName
  };
};

export default compose(
  connect(mapStateToProps, null),
  firestoreConnect(props => {
    return [];
  })
)(Note);
