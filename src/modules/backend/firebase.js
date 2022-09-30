import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const config = JSON.parse(process.env.FIREBASE_CONFIG)

if (getApps().length === 0) {
	initializeApp({
		credential: cert(config)
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

//TODO: analytics?

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore();
