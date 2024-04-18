
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import{getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRWouQ__NQcU5z78rkQWrB2CKe-R5nrJg",
  authDomain: "colombiapp-128f9.firebaseapp.com",
  projectId: "colombiapp-128f9",
  storageBucket: "colombiapp-128f9.appspot.com",
  messagingSenderId: "184123264695",
  appId: "1:184123264695:web:8e90e2df0daf3701c04732"
};

// Initialize Firebase
export const FireApp = initializeApp(firebaseConfig);
export const Fireauth = getAuth(FireApp);
export const FireStoreDB = getFirestore(FireApp);
