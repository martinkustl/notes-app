import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import * as firebase from 'firebase';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import authReducer from './store/reducers/auth';
import notesReducer from './store/reducers/notes';
/* import 'react-quill/dist/quill.snow.css'; */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

var firebaseConfig = {
  apiKey: 'AIzaSyDoHpFtpt9IUkjNzzkD8MP1Ezgzx_EafWA',
  authDomain: 'bachelors-thesis-notes-app.firebaseapp.com',
  databaseURL: 'https://bachelors-thesis-notes-app.firebaseio.com',
  projectId: 'bachelors-thesis-notes-app',
  storageBucket: 'bachelors-thesis-notes-app.appspot.com',
  messagingSenderId: '73082753093',
  appId: '1:73082753093:web:b982df76acadef0ebad32c',
  measurementId: 'G-867P51E70L'
};

firebase.initializeApp(firebaseConfig);

// firebase.firestore();

const rootReducer = combineReducers({
  auth: authReducer,
  notes: notesReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(getFirebase)))
);

const rrfConfig = { userProfile: 'users', useFirestoreForProfile: true };

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

/* firebase.firestore().settings({
  //I'm using the firebase timestamp function
  timestampsInSnapshots: true
}); */

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

defineCustomElements(window); // add PWA functionality
