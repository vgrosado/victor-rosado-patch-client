
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "firebase/storage";
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth, signOut, signInWithEmailAndPassword, } from "firebase/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDFfDqHek8HcrYetw_Di-0eEnnu_CJU6s0",
  authDomain: "patch-397bb.firebaseapp.com",
  projectId: "patch-397bb",
  storageBucket: "patch-397bb.appspot.com",
  messagingSenderId: "789116654686",
  appId: "1:789116654686:web:54b054c4b9a35d1cb050cf"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const db = getFirestore(app);
export const auth = getAuth();

//login exisisting user
export function login(email, password) {
   return signInWithEmailAndPassword(auth, email, password);
}

//signout current user
export function logOut(){
  return signOut(auth)
}

//create/auth new user using email/password
export function signUp(email, password) {
   return createUserWithEmailAndPassword(auth, email, password);
};


export function useAuth(){
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, user => setCurrentUser(user))
    return unSub;
  })
  return currentUser;
};