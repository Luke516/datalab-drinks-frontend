
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, doc, setDoc, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// TODO: env var necessary?
const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: "datalab-drinks.firebaseapp.com",
	projectId: "datalab-drinks",
	storageBucket: "datalab-drinks.appspot.com",
	messagingSenderId: "665503726248",
	appId: "1:665503726248:web:d8d9f23e2faca94195609d",
	measurementId: "G-FYSQY82636"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
