// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsHasq3IXKxXXiA5iOykTCfI1clmLlRIQ",
  authDomain: "netflix-replica-7569a.firebaseapp.com",
  projectId: "netflix-replica-7569a",
  storageBucket: "netflix-replica-7569a.appspot.com",
  messagingSenderId: "204074525734",
  appId: "1:204074525734:web:f9bf6a3a0a0d2f7cb1f2e7"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);


