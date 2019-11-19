import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import * as firebase from 'firebase';

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
/* firebase.firestore().settings({
  //I'm using the firebase timestamp function
  timestampsInSnapshots: true
}); */

ReactDOM.render(<App />, document.getElementById('root'));

defineCustomElements(window); // add PWA functionality
