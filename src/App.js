import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonButton
} from '@ionic/react';
import { addCircleOutline, search, people, home, lock } from 'ionicons/icons';

import styled from 'styled-components';

import { IonReactRouter } from '@ionic/react-router';
import HomeMenu from './components/HomeMenu/HomeMenu';
import Home from './pages/Home';
import Search from './pages/Search';
import Shared from './pages/Shared';
import PrivateNotes from './pages/PrivateNotes';
import Note from './components/Note/Note';

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

/* const StyledAddTabButton = styled(IonButton)`
  --padding-start: 0;
  --padding-end: 0;
  font-size: 22px;
  width: 100%;
  height: 100%;
  margin: 0;
`;

const StyledAddIcon = styled(IonIcon)`
  padding-top: 2px;
`; */

const StyledAddTabButton = styled(IonTabButton)`
  --color: var(--ion-color-success);
`;

const App = props => {
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  useEffect(() => {
    console.log(props);
  });

  const onIsNoteOpenChange = state => setIsNoteOpen(state);

  let tabBar;
  if (isNoteOpen) {
    tabBar = <IonTabBar></IonTabBar>;
  } else {
    tabBar = (
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home" color="secondary">
          <IonIcon icon={home} />
        </IonTabButton>
        <IonTabButton tab="search" href="/search">
          <IonIcon icon={search} />
        </IonTabButton>
        <IonTabButton tab="add">
          {/* <StyledAddTabButton
            onClick={() => setShowNewNoteModal(true)}
            color="success"
            fill="clear"
          >
            <IonIcon icon={addCircleOutline} />
          </StyledAddTabButton> */}
          <StyledAddTabButton onClick={() => setShowNewNoteModal(true)}>
            <IonIcon icon={addCircleOutline} />
          </StyledAddTabButton>
          <NewNoteModal
            showNewNoteModal={showNewNoteModal}
            onShowNewNoteModalChange={setShowNewNoteModal}
          />
        </IonTabButton>
        {/* <IonTabButton tab="private" href="/private-notes">
          <IonIcon icon={lock} />
        </IonTabButton> */}
        <IonTabButton tab="shared" href="/shared">
          <IonIcon icon={people} />
        </IonTabButton>
      </IonTabBar>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <HomeMenu contentId="main" />
        <IonTabs>
          <IonRouterOutlet id="main">
            <Route path="/home" exact={true} component={Home} />
            <Route
              path="/note/:id"
              exact={true}
              render={props => (
                <Note {...props} onIsNoteOpenChange={onIsNoteOpenChange} />
              )}
            />
            <Route path="/search" component={Search} exact={true} />
            <Route
              path="/private-notes"
              component={PrivateNotes}
              exact={true}
            />
            <Route path="/shared" component={Shared} exact={true} />
            <Route
              path="/"
              render={() => <Redirect to="/home" />}
              exact={true}
            />
          </IonRouterOutlet>
          {tabBar}
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
