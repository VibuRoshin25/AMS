import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.js";

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
