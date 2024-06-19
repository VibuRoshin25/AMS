// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDZfD-svlfoMXAtsAuKT4XIjndwi_WVcbA",
  authDomain: "flipopay-ams.firebaseapp.com",
  projectId: "flipopay-ams",
  storageBucket: "flipopay-ams.appspot.com",
  messagingSenderId: "955778958471",
  appId: "1:955778958471:web:e3609a4dc35f6ef4786422",
  measurementId: "G-TZR2786M9E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();
export default app;
