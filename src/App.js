import React, { useState, Fragment, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import 'firebase/database';

import { connect } from 'react-redux';

import { useFirebase, useFirestore } from 'react-redux-firebase';

import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { addCircleOutline, search, people, home } from 'ionicons/icons';

import { IonReactRouter } from '@ionic/react-router';
import HomeMenu from './components/HomeMenu/HomeMenu';
import Home from './pages/Home';
import Search from './pages/Search';
import Shared from './pages/Shared';
import Note from './pages/Note';
import Auth from './pages/Auth';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { setupConfig } from '@ionic/core';
setupConfig({
  inputBlurring: false
});

const App = ({ auth }) => {
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  const firebase = useFirebase();
  const firestore = useFirestore();

  let tabButtons = null;

  useEffect(() => {
    var userStatusDatabaseRef = firebase.database().ref('/status/' + auth.uid);
    var isOfflineForDatabase = {
      state: 'offline',
      last_changed: firebase.database.ServerValue.TIMESTAMP
    };

    var isOnlineForDatabase = {
      state: 'online',
      last_changed: firebase.database.ServerValue.TIMESTAMP
    };
    var userStatusFirestoreRef = firestore.doc('/status/' + auth.uid);

    var isOfflineForFirestore = {
      state: 'offline',
      last_changed: firestore.FieldValue.serverTimestamp()
    };

    var isOnlineForFirestore = {
      state: 'online',
      last_changed: firestore.FieldValue.serverTimestamp()
    };

    firebase
      .database()
      .ref('.info/connected')
      .on('value', function(snapshot) {
        if (snapshot.val() === false) {
          userStatusFirestoreRef.set(isOfflineForFirestore);
          return;
        }

        userStatusDatabaseRef
          .onDisconnect()
          .set(isOfflineForDatabase)
          .then(function() {
            userStatusDatabaseRef.set(isOnlineForDatabase);
            userStatusFirestoreRef.set(isOnlineForFirestore);
          });
      });
  }, [auth.uid, firebase, firestore]);

  const onIsNoteOpenChange = state => {
    setIsNoteOpen(state);
  };

  if (isNoteOpen) {
    tabButtons = <IonTabBar></IonTabBar>;
  } else {
    tabButtons = (
      <IonTabBar slot="bottom" translucent={true}>
        <IonTabButton tab="home" href="/home" color="secondary">
          <IonIcon icon={home} />
        </IonTabButton>
        <IonTabButton tab="search" href="/search">
          <IonIcon icon={search} />
        </IonTabButton>
        <IonTabButton tab="add" href="/newnote">
          <IonIcon icon={addCircleOutline} color="success" />
        </IonTabButton>
        <IonTabButton tab="shared" href="/shared">
          <IonIcon icon={people} />
        </IonTabButton>
      </IonTabBar>
    );
  }

  let routes = (
    <IonRouterOutlet id="main">
      <Route path="/" component={Auth} />
      <Redirect to="/" />
    </IonRouterOutlet>
  );

  if (auth.uid) {
    routes = (
      <Fragment>
        <HomeMenu />
        <IonTabs>
          <IonRouterOutlet id="main">
            <Route
              path="/note/usernote/:id"
              exact={true}
              render={props => (
                <Note
                  {...props}
                  onIsNoteOpenChange={onIsNoteOpenChange}
                  isNewNote={false}
                />
              )}
            />
            <Route
              path="/shared/sharednote/:id"
              exact={true}
              render={props => (
                <Note {...props} onIsNoteOpenChange={onIsNoteOpenChange} />
              )}
            />
            <Route
              path="/newnote"
              exact={true}
              render={props => (
                <Note
                  {...props}
                  isNewNote={true}
                  onIsNoteOpenChange={onIsNoteOpenChange}
                  testauth={auth}
                />
              )}
            />
            <Route path="/home" exact={true} component={Home} />
            <Route path="/search" component={Search} exact={true} />
            <Route path="/shared" component={Shared} exact={true} />
            <Route path="/" component={Home} exact={true} />
            <Redirect to="/" />
          </IonRouterOutlet>
          {tabButtons}
        </IonTabs>
      </Fragment>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>{routes}</IonReactRouter>
    </IonApp>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(App);
