// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9CaXHGdMX0Ku6f7psSuhLjolZ-GTtaLg",
  authDomain: "harpa-crista-b8f39.firebaseapp.com",
  projectId: "harpa-crista-b8f39",
  storageBucket: "harpa-crista-b8f39.appspot.com",
  messagingSenderId: "1082098453483",
  appId: "1:1082098453483:web:a62734a36f4c39f1593060"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
