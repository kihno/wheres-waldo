import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC8uvPxscyG-MSkJDT2JEYtDtzuFTys0mE",
    authDomain: "wheres-waldo-f0df8.firebaseapp.com",
    projectId: "wheres-waldo-f0df8",
    storageBucket: "wheres-waldo-f0df8.appspot.com",
    messagingSenderId: "742383933441",
    appId: "1:742383933441:web:8d2c9894f76e74b8bbc800",
    measurementId: "G-5C23MR9Q7P"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;