// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBTVZIRX7yZU9GY9POoivKJ7YjrikAxH8U",
  authDomain: "login-part-122a1.firebaseapp.com",
  projectId: "login-part-122a1",
  storageBucket: "login-part-122a1.firebasestorage.app",
  messagingSenderId: "58393268621",
  appId: "1:58393268621:web:75a62631c52edcf787adc4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);