import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebaseConfig";

const secondaryApp = initializeApp(firebaseConfig, "Secondary");

const secondaryAuth = getAuth(secondaryApp);

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      secondaryAuth,
      email,
      password
    );
    console.log("User " + userCredential.user.uid + " created successfully!");
    await signOut(secondaryAuth);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
