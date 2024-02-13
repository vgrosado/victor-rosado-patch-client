import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "firebase/storage";
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
const APIKEY = process.env.REACT_APP_FIREBASE_API_KEY;
const AUTHDOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const PROJECTID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const STORAGEBUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const MESSENGERSENDERID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const APPID = process.env.REACT_APP_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSENGERSENDERID,
  appId: APPID
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const db = getFirestore(app);
export const auth = getAuth(app);

//login exisisting user
export function login(email, password) {
   return signInWithEmailAndPassword(auth, email, password);
};

//signout current user
export function logOut(){
  return signOut(auth)
};

//create/auth new user using email/password
export function signUp(email, password) {
   return createUserWithEmailAndPassword(auth, email, password);
};


export function useAuth(){
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, user  => setCurrentUser(user))
    return unSub;
  },[])
  return currentUser;
};