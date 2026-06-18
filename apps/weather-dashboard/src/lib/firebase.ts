import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: 'playground-apps-dev', // Placeholder until user provides real config
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
