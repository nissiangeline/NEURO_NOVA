// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzAn-zYAJXEs1K-2JUFJH9AvFSMOtO3fQ",
  authDomain: "neuro-nova-lol-95191906-db97a.firebaseapp.com",
  databaseURL: "https://neuro-nova-lol-95191906-db97a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "neuro-nova-lol-95191906-db97a",
  storageBucket: "neuro-nova-lol-95191906-db97a.firebasestorage.app",
  messagingSenderId: "698351761458",
  appId: "1:698351761458:web:82e308ff6634ebf07fe42b"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
