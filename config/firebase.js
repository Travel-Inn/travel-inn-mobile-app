import  firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth';

// Web app firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBESqOWbc5mpsJHB7DE-isPZsaogIFFu0k",
  authDomain: "travel-inn-e9999.firebaseapp.com",
  projectId: "travel-inn-e9999",
  storageBucket: "travel-inn-e9999.appspot.com",
  messagingSenderId: "208360428593",
  appId: "1:208360428593:web:2b26c52249d0994466b110",
  measurementId: "G-TRXZ6EG974"
};

// firebase init
let Firebase;

if (firebase.apps.length === 0) {
Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;