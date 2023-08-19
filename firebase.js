// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {  getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {  getFirestore, doc, setDoc ,addDoc,collection,deleteDoc,getDocs,updateDoc,getDoc ,serverTimestamp} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import {  getStorage ,deleteObject, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5OUFqXD5vwRmDzyvYdKF5X9wj9fUT7mw",
  authDomain: "hackthone-99d83.firebaseapp.com",
  projectId: "hackthone-99d83",
  storageBucket: "hackthone-99d83.appspot.com",
  messagingSenderId: "823390640986",
  appId: "1:823390640986:web:19edf7c4017e6a2bcdf163"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const storage = getStorage();

export{
    app,
    getAuth, 
    createUserWithEmailAndPassword,
    auth,
    getFirestore ,
    db,
    doc, 
    setDoc,
    signInWithEmailAndPassword,
    addDoc,
    collection,
    deleteDoc,
    getDocs,
    signOut,
    updateDoc,
    getDoc,
    getStorage,
    storage,
    deleteObject,
    ref,
    uploadBytes,
    uploadString,
    uploadBytesResumable,
    getDownloadURL,
    serverTimestamp,
    
}