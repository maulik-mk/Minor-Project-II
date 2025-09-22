
import { getApp, getApps, initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBuYiqCpf6V8jNxj4xjCbrwrpI29djh7LM",
  authDomain: "sensai-14ffa.firebaseapp.com",
  projectId: "sensai-14ffa",
  storageBucket: "sensai-14ffa.appspot.com", // ✅ fixed
  messagingSenderId: "945249125111",
  appId: "1:945249125111:web:841caeb041a83b23c5c9f2",
  measurementId: "G-FB94TMQJC4",
};



const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);