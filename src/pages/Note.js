import React, { useState, useEffect, useCallback, useRef } from 'react';

import { connect } from 'react-redux';

import * as firebase from 'firebase';

import { debounce } from '../shared/utility';

import ReactQuill, { Quill } from 'react-quill';

import NoteActionButtons from '../components/Note/NoteActionButtons/NoteActionButtons';
import ActionSheet from '../components/Note/ActionSheet';
import ShareModal from '../components/Note/ShareModal';
import ImageModal from '../components/Note/ImageModal';
import InfoTab from '../components/Note/InfoTab';

import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType
} from '@capacitor/core';

import uuid from 'uuid/v4';

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
  IonLabel,
  IonMenuToggle
} from '@ionic/react';

import { create, informationCircleOutline } from 'ionicons/icons';

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
  history,
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
    percentage: null,
    ref: null
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
          if (doc.data()) {
            setNote({ ...doc.data(), id: match.params.id });
          }
        });
    } else if (isNew.id) {
      firebase
        .firestore()
        .collection('notes')
        .doc(isNew.id)
        .onSnapshot(doc => {
          if (doc.data()) {
            setNote({ ...doc.data(), id: isNew.id });
          }
        });
    }
  }, [match.params.id, isNew, firestore]);

  useEffect(() => {
    if (quillRef.current && note) {
      const quillHTML = quillRef.current.getEditor().root.innerHTML;
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
        quillRef.current.blur();
      }
    }
    if (note && quillRef.current === null) {
      setNoteHeading(note.heading);
      setNoteText(note.content);
    }
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
    setNote(false);
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
            content: content,
            updatedAt: new Date()
          };
        } else if (note.id) {
          submitNote = {
            id: note.id,
            heading: heading,
            content: content,
            updatedAt: new Date()
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
          console.log('photo not taken');
        });
    }
  };

  const handlePickGalleryPhoto = () => {
    if (!Capacitor.isPluginAvailable('Camera')) {
      return console.log('Camera not available');
    } else {
      Plugins.Camera.getPhoto({
        quality: 90,
        source: CameraSource.Photos,
        correctOrientation: true,
        height: 320,
        width: 200,
        resultType: CameraResultType.Base64
      })
        .then(photo => {
          uploadPhoto(photo);
        })
        .catch(error => {
          console.log(error);
          console.log('photo not taken');
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
        setUploadingImage({
          isOpen: true,
          percentage: percentage,
          ref: uploadTask
        });
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('Image uploaded');
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          insertPhotoToNote(url);
          setUploadingImage({ isOpen: false, percentage: null, ref: null });
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

  const handleImageUploadCancel = () => {
    if (uploadingImage.ref) {
      uploadingImage.ref.cancel();
    }
    setUploadingImage({
      isOpen: false,
      percentage: null,
      ref: null
    });
  };

  const handleDeleteNote = () => {
    firestore
      .delete({
        collection: 'notes',
        doc: note.id
      })
      .then(res => {
        console.log(res);
        setNote();
        history.goBack();
      });
  };
  return (
    <IonPage>
      {note && <InfoTab note={note} />}
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" color="secondary" />
          </IonButtons>
          {/* <IonTitle>Cesta k poznámce</IonTitle> */}
          <IonButtons slot="end">
            <IonMenuToggle menu="infoTabMenu">
              <IonButton type="button" color="secondary">
                <IonIcon icon={informationCircleOutline} />
              </IonButton>
            </IonMenuToggle>
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
        {/* <InfoTab showInfoTab={showInfoTab} setShowInfoTab={setShowInfoTab} /> */}
        <ActionSheet
          showActionSheet={showActionSheet}
          setShowActionSheet={setShowActionSheet}
          setShowShareModal={setShowShareModal}
          handleDeleteNote={handleDeleteNote}
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
              onClick={() => handleImageUploadCancel()}
              contentId="infoTab"
            >
              Zrušit nahrávání
            </IonButton>
          </StyledUploadProgressDiv>
        </StyledUploadImageModal>
      </IonContent>
      <IonFooter>
        <NoteActionButtons
          handleTakePhoto={handleTakePhoto}
          handlePickGalleryPhoto={handlePickGalleryPhoto}
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
