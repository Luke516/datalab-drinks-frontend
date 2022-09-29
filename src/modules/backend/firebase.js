import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import serviceAccount from "../../secret/datalab-drinks-firebase-adminsdk-q89l4-bba41cec46.json";

if (getApps().length === 0) {
	initializeApp({
		credential: cert(serviceAccount)
	})
}

// // TODO: env var necessary?
// const firebaseConfig = {
// 	apiKey: process.env.FIREBASE_API_KEY,
// 	authDomain: "datalab-drinks.firebaseapp.com",
// 	projectId: "datalab-drinks",
// 	storageBucket: "datalab-drinks.appspot.com",
// 	messagingSenderId: "665503726248",
// 	appId: "1:665503726248:web:d8d9f23e2faca94195609d",
// 	measurementId: "G-FYSQY82636"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore();
