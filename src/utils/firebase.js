import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAAht9byebWc0qVJeqWzqklTFq7PErdIA",
  authDomain: "social-8cbea.firebaseapp.com",
  projectId: "social-8cbea",
  storageBucket: "social-8cbea.appspot.com",
  messagingSenderId: "859587187638",
  appId: "1:859587187638:web:30d6998663bf7769e7a717",
  measurementId: "G-9X05C73LBJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
