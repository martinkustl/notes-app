import React, { useState, Fragment } from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

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

  let tabButtons = null;

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
    </IonRouterOutlet>
  );

  if (auth.uid) {
    routes = (
      <Fragment>
        <HomeMenu />
        <IonTabs>
          <IonRouterOutlet id="main">
            <Route path="/home" exact={true} component={Home} />
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
            <Route path="/search" component={Search} exact={true} />
            <Route path="/shared" component={Shared} exact={true} />
            <Route path="/" component={Home} exact={true} />
          </IonRouterOutlet>
          {tabButtons}
        </IonTabs>
      </Fragment>
    );
  }

  return (
    <IonApp>
      {/* <HomeMenu /> */}
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
