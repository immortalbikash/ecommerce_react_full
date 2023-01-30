// import * as firebase from '/firebase';
import firebase from 'firebase/compat/app';
// import 'firebase/database'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC1fpM7x0_zk5co7e4pk1diiZawrrrnl7c",
    authDomain: "ecommerce-react-bf39a.firebaseapp.com",
    projectId: "ecommerce-react-bf39a",
    storageBucket: "ecommerce-react-bf39a.appspot.com",
    messagingSenderId: "713864320571",
    appId: "1:713864320571:web:c0d980a83b0dc3f6d52e1e"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const fs = firebase.firestore();
  const storage = firebase.storage();

export {auth, fs, storage}