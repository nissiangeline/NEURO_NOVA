// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-8668201909-34cdb",
  "appId": "1:35233822162:web:1d4dd6af4ef16a22a6c40b",
  "apiKey": "AIzaSyBwYOrNjsjN8-9tfgGGIQPrW0mZb0BvCGc",
  "authDomain": "studio-8668201909-34cdb.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "35233822162",
  "databaseURL": "https://studio-8668201909-34cdb-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
