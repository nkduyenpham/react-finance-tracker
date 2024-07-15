// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDSQledXkA7JmUL-v8G5K7WKUZwR2puJ2k",
    authDomain: "personal-finance-tracker-3a4e1.firebaseapp.com",
    projectId: "personal-finance-tracker-3a4e1",
    storageBucket: "personal-finance-tracker-3a4e1.appspot.com",
    messagingSenderId: "824131387541",
    appId: "1:824131387541:web:34eee4212c913b59259b9c",
    measurementId: "G-7W2GNQ7EQ0"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
const db = getFirestore(app);
const auth = getAuth(app); 
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };