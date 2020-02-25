import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import {
  ReactReduxFirebaseProvider,
  getFirebase,
  firebaseReducer
} from 'react-redux-firebase';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import authReducer from './store/reducers/auth';
import 'react-quill/dist/quill.snow.css';

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

firebase
  .firestore()
  .enablePersistence()
  .catch(err => {
    console.log(err);
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });

const rootReducer = combineReducers({
  auth: authReducer,
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

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

defineCustomElements(window); // add PWA functionality
