// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCplYfDJ6_qLw8MLLEzSnwLIw3uQoy4a1Q",
  authDomain: "animal-find-13b74.firebaseapp.com",
  projectId: "animal-find-13b74",
  storageBucket: "animal-find-13b74.firebasestorage.app",
  messagingSenderId: "62136338829",
  appId: "1:62136338829:web:1e44490b08aa706c6115c4",
  measurementId: "G-5VR3WQYTZK"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const database = getDatabase(firebase);
export const auth = getAuth(firebase);

export const db = getFirestore(firebase);


