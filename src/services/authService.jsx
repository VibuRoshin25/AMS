// authService.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase/firebase.js";

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
