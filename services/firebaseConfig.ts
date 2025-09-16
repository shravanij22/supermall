// Fix: Switched to Firebase v8 compatibility syntax to work with Firebase v9+ SDK.
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// The Firestore connection error is happening because the configuration below uses placeholder values.
// I've updated this to use environment variables. You must set these variables in your
// development environment with your actual Firebase project credentials to connect successfully.
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// This function safely initializes Firebase and returns a Firestore instance or null.
// This prevents the application from crashing if the Firebase environment variables are not set.
function initializeFirebase() {
    try {
        // If Firebase is already initialized, return its firestore instance.
        if (firebase.apps.length) {
            return firebase.app().firestore();
        }
        
        // Check for essential config keys before initializing.
        if (firebaseConfig.apiKey && firebaseConfig.projectId) {
            const app = firebase.initializeApp(firebaseConfig);
            return app.firestore();
        }

        // If config is missing, log an error and return null.
        console.error("Firebase config is missing. Please set up your environment variables. Firestore functionality will be disabled.");
        return null;

    } catch (error) {
        console.error("Error initializing Firebase:", error);
        return null;
    }
}

// Export the result of the initialization. It will be either a Firestore instance or null.
export const db = initializeFirebase();