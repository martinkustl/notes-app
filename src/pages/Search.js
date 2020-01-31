import React, { useEffect, useState } from 'react';
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonSearchbar,
  IonItem
} from '@ionic/react';

import { StyledIonList } from '../styles';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const Search = ({ userNotes, sharedNotes }) => {
  const [notesList, setNotesList] = useState([]);
  const [searchResults, setSearchResults] = useState();
  const [searchInput, setSearchInput] = useState();

  useEffect(() => {
    let userNotesList = [];
    let sharedNotesList = [];
    if (userNotes && sharedNotes) {
      userNotesList = userNotes.map(userNote => {
        return {
          id: userNote.id,
          heading: userNote.heading,
          isUserNote: true
        };
      });
      sharedNotesList = sharedNotes.map(sharedNote => {
        return {
          id: sharedNote.id,
          heading: sharedNote.heading,
          isUserNote: false
        };
      });
    }
    const mergedList = [...userNotesList, ...sharedNotesList];
    setNotesList([...mergedList]);
    if (!searchInput) {
      setSearchResults([...mergedList]);
    }
  }, [userNotes, sharedNotes, searchInput]);

  const handleSearch = e => {
    let newList = [];
    setSearchInput(e.target.value);
    if (e.target.value !== '' && e.target.value) {
      newList = notesList.filter(note => {
        const lowerCase = note.heading.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lowerCase.includes(filter);
      });
      setSearchResults(newList);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Vyhledávání</IonTitle>
        </IonToolbar>
        <IonToolbar color="primary">
          <IonSearchbar
            placeholder="Hledat"
            color="tertiary"
            onIonChange={handleSearch}
            value={searchInput}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary">
        <StyledIonList>
          {searchResults &&
            searchResults.map(note => {
              if (note.isUserNote) {
                return (
                  <IonItem
                    routerDirection="forward"
                    routerLink={`/note/usernote/${note.id}`}
                    detail
                    key={note.id}
                  >
                    {note.heading}
                  </IonItem>
                );
              } else {
                return (
                  <IonItem
                    routerDirection="forward"
                    routerLink={`/shared/sharednote/${note.id}`}
                    key={note.id}
                    detail
                  >
                    {note.heading}
                  </IonItem>
                );
              }
            })}
        </StyledIonList>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = state => {
  return {
    userNotes: state.firestore.ordered.userNotes,
    sharedNotes: state.firestore.ordered.sharedNotes,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [
      {
        collection: 'notes',
        where: ['collaborators', 'array-contains', props.auth.email],
        orderBy: ['updatedAt', 'desc'],
        storeAs: 'sharedNotes'
      },
      {
        collection: 'notes',
        where: ['ownerId', '==', props.auth.uid],
        orderBy: ['updatedAt', 'desc'],
        storeAs: 'userNotes'
      }
    ];
  })
)(Search);
