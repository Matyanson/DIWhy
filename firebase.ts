import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:  process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: "diwhy-39b77.appspot.com",
    messagingSenderId: "682672803666",
    appId: "1:682672803666:web:55cfe4d3bfa3d1188a348b",
    measurementId: "G-3CQQPH2Y9G"
  };

// Initialize Firebase
  try {
    if(!firebase.apps.length)
      firebase.initializeApp(firebaseConfig);
  } catch(err){
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)}
  }
  //load fb SDKs

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();