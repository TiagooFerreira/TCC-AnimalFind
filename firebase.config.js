import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCplYfDJ6_qLw8MLLEzSnwLIw3uQoy4a1Q",
  authDomain: "animal-find-13b74.firebaseapp.com",
  databaseURL: "https://animal-find-13b74-default-rtdb.firebaseio.com",
  projectId: "animal-find-13b74",
  storageBucket: "animal-find-13b74.appspot.com",
  messagingSenderId: "62136338829",
  appId: "1:62136338829:web:1e44490b08aa706c6115c4",
  measurementId: "G-5VR3WQYTZK"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dbRealtime = getDatabase(app);
export const storage = getStorage(app);

export const db = getFirestore(app);


