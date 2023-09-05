
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDFfDqHek8HcrYetw_Di-0eEnnu_CJU6s0",
  authDomain: "patch-397bb.firebaseapp.com",
  projectId: "patch-397bb",
  storageBucket: "patch-397bb.appspot.com",
  messagingSenderId: "789116654686",
  appId: "1:789116654686:web:54b054c4b9a35d1cb050cf"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);