
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "firebase/storage";
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth, signOut, signInWithEmailAndPassword, } from "firebase/auth";
import { useEffect, useState } from "react";

const key = process.env.API_KEY;
const authdomain = process.env.AUTH_DOM;
const projectid = process.env.PROJ_ID;
const storagebucket = process.env.STRG_BUCKET;
const messagingsenderid = process.env.MSG_SENDER_ID;
const appid = process.env.APP_ID;

const firebaseConfig = {
  apiKey: key,
  authDomain: authdomain,
  projectId: projectid,
  storageBucket: storagebucket,
  messagingSenderId: messagingsenderid,
  appId: appid 
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