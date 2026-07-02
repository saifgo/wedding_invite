import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getFirestore,
  type Firestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import type { RSVPFormData } from "../types/wedding";

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

export function isFirebaseConfigured(): boolean {
  return Boolean(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID,
  );
}

function getDb(): Firestore {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured");
  }
  if (!app) {
    app = initializeApp({
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    });
    db = getFirestore(app);
  }
  return db!;
}

export async function submitRSVP(data: RSVPFormData) {
  const firestore = getDb();
  const docRef = await addDoc(collection(firestore, "rsvps"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}
