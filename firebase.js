import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArS3ojvi9z96u99CkRjsduk2gFgN_feaE",
    authDomain: "diwhy-39b77.firebaseapp.com",
    databaseURL: "https://diwhy-39b77.firebaseio.com",
    projectId: "diwhy-39b77",
    storageBucket: "diwhy-39b77.appspot.com",
    messagingSenderId: "682672803666",
    appId: "1:682672803666:web:55cfe4d3bfa3d1188a348b",
    measurementId: "G-3CQQPH2Y9G"
  };

// Initialize Firebase
let app, db, storage = null;
  try {
    app = firebase.initializeApp(firebaseConfig);
  } catch(err){
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)}
  }
  //load fb SDKs
  db = firebase.firestore();
  storage = firebase.storage();

export { app, db, storage };