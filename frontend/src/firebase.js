import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDF0sZAtJd2rf0WkLMlLBV30B5_suFK1Vk",
    authDomain: "gym-management-74ad3.firebaseapp.com",
    databaseURL: "https://gym-management-74ad3-default-rtdb.firebaseio.com",
    projectId: "gym-management-74ad3",
    storageBucket: "gym-management-74ad3.firebasestorage.app",
    messagingSenderId: "230103361986",
    appId: "1:230103361986:web:edae5e8c5bc31fd048ce5b",
    measurementId: "G-VQBHDT4TGH"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Authentication

export { db, auth }; 