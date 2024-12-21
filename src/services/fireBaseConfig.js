import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  query, 
  updateDoc, 
  addDoc, 
  where, 
  onSnapshot,
  deleteDoc,
  getDocs
} from 'firebase/firestore';

export { 
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
  sendEmailVerification
} from 'firebase/auth';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_PROJECT_ID + '.firebaseapp.com',
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_PROJECT_ID +'.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID, appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


setPersistence(auth, browserLocalPersistence);

export default app;