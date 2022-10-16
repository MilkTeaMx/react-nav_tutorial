import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';

const {
    API_KEY,
    APP_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID
} = process.env 

const firebaseConfig = {
    apiKey: `${API_KEY}`,
    authDomain: `${APP_DOMAIN}`,
    projectId: `${PROJECT_ID}`,
    storageBucket: `${STORAGE_BUCKET}`,
    messagingSenderId: `${MESSAGING_SENDER_ID}`,
    appId: `${APP_ID}`,
    measurementId: `${MEASUREMENT_ID}`
};
  

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)