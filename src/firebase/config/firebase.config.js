// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBkwgPEsZffYGfGVN7oUz5IXlw2urJQKU4",
  authDomain: "tx-ai-engine-ff6f7.firebaseapp.com",
  projectId: "tx-ai-engine-ff6f7",
  storageBucket: "tx-ai-engine-ff6f7.appspot.com",
  messagingSenderId: "777566564371",
  appId: "1:777566564371:web:f1a05a002b47256bf4cfe6",
  measurementId: "G-RX851HM4VR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);