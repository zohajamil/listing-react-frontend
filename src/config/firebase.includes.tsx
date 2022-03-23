import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyD-TeEkCvNkkyPHllcCzv3Iw4OzBtZ4weU",
  authDomain: "grocery-items-management.firebaseapp.com",
  projectId: "grocery-items-management",
  storageBucket: "grocery-items-management.appspot.com",
  messagingSenderId: "344710223161",
  appId: "1:344710223161:web:fd0cda7e6f0b3a1f6344e8",
  measurementId: "G-ZRPRS85JQZ"
});
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { firebaseApp, auth, db, storage };
