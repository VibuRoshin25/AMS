import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZfD-svlfoMXAtsAuKT4XIjndwi_WVcbA",
  authDomain: "flipopay-ams.firebaseapp.com",
  projectId: "flipopay-ams",
  storageBucket: "flipopay-ams.appspot.com",
  messagingSenderId: "955778958471",
  appId: "1:955778958471:web:e3609a4dc35f6ef4786422",
  measurementId: "G-TZR2786M9E",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
