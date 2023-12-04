import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth' ; 
import { getFirestore} from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAH1bzHNhFAkIdRUWX25F5N1qMk6DULxAI",
    authDomain: "todolist-c6e6e.firebaseapp.com",
    projectId: "todolist-c6e6e",
    storageBucket: "todolist-c6e6e.appspot.com",
    messagingSenderId: "260204943281",
    appId: "1:260204943281:web:70cd5b140f6c2a8be10f90",
    measurementId: "G-ZLQ9TSQPBS"
};

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)