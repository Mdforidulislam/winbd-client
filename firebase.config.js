import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDtSqoZQ-3M5Y41xEUSqEGgcP23vfltBqo",
    authDomain: "project-a4866.firebaseapp.com",
    projectId: "project-a4866",
    storageBucket: "project-a4866.appspot.com",
    messagingSenderId: "643345364925",
    appId: "1:643345364925:web:98e60fa74dc06c8bf684d4"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);