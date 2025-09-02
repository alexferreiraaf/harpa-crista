// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "harpa-crista-b8f39.firebaseapp.com",
  projectId: "harpa-crista-b8f39",
  storageBucket: "harpa-crista-b8f39.appspot.com",
  messagingSenderId: "1082098453483",
  appId: "1:1082098453483:web:a62734a36f4c39f1593060"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export { db };
