// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxL-ODQD9VYL9Sjqhx5VTYHmKxGPprOc4",
  authDomain: "farmportal-8f679.firebaseapp.com",
  projectId: "farmportal-8f679",
  storageBucket: "farmportal-8f679.firebasestorage.app",
  messagingSenderId: "36765809044",
  appId: "1:36765809044:web:252cc65eef90e2b0097781",
  measurementId: "G-1CS2908MWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;

export const db = getFirestore(app);
export const auth = getAuth(app);