// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlb7-w_mJnx6-ebAW-Ez0p7fOfoE9koBk",
  authDomain: "memorygame-1692c.firebaseapp.com",
  projectId: "memorygame-1692c",
  storageBucket: "memorygame-1692c.firebasestorage.app",
  messagingSenderId: "933229558062",
  appId: "1:933229558062:web:352cf62c16724d4542a2bf",
  measurementId: "G-YCHD6HMV23",
  databaseURL:
    "https://memorygame-1692c-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
