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

import styled from 'styled-components';

import { IonReactRouter } from '@ionic/react-router';
import HomeMenu from './components/HomeMenu/HomeMenu';
import Home from './pages/Home';
import Search from './pages/Search';
import Shared from './pages/Shared';
import Note from './components/Note/Note';
import Auth from './Auth/Auth';

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

import NewNoteModal from './components/NewNoteModal/NewNoteModal';

const StyledAddTabButton = styled(IonTabButton)`
  --color: var(--ion-color-success);
`;

const App = ({ auth }) => {
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  let tabButtons;

  tabButtons = (
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/home" color="secondary">
        <IonIcon icon={home} />
      </IonTabButton>
      <IonTabButton tab="search" href="/search">
        <IonIcon icon={search} />
      </IonTabButton>
      <IonTabButton tab="add">
        <StyledAddTabButton onClick={() => onShowNewNoteModalChange(true)}>
          <IonIcon icon={addCircleOutline} />
        </StyledAddTabButton>
        <NewNoteModal
          showNewNoteModal={showNewNoteModal}
          onShowNewNoteModalChange={setShowNewNoteModal}
        />
      </IonTabButton>
      <IonTabButton tab="shared" href="/shared">
        <IonIcon icon={people} />
      </IonTabButton>
    </IonTabBar>
  );

  const hideMainTabs = hide => {
    if (hide) {
      tabButtons = <IonTabBar></IonTabBar>;
    }
  };

  const onShowNewNoteModalChange = state => {
    setShowNewNoteModal(state);
  };

  const onIsNoteOpenChange = state => {
    hideMainTabs(state);
    setIsNoteOpen(state);
  };

  if (isNoteOpen) {
    tabButtons = <IonTabBar></IonTabBar>;
  }

  let routes = (
    <IonRouterOutlet id="main">
      {/* <Route path="/auth" component={Auth} /> */}
      {/* <Route path="/" render={() => <Redirect to="/auth" />} exact={true} /> */}
      <Route path="/" component={Auth} />
    </IonRouterOutlet>
  );

  if (auth.uid) {
    routes = (
      <Fragment>
        <HomeMenu contentId="main" />
        <IonTabs>
          <IonRouterOutlet id="main">
            {/* <Route path="/home" exact={true} component={Home} /> */}
            <Route
              path="/note/:id"
              exact={true}
              render={props => (
                <Note {...props} onIsNoteOpenChange={onIsNoteOpenChange} />
              )}
            />
            <Route path="/search" component={Search} exact={true} />
            <Route path="/shared" component={Shared} exact={true} />
            <Route
              path="/"
              /* render={() => <Redirect to="/home" />} */
              component={Home}
              exact={true}
            />
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
