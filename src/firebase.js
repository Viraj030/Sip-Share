import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAymIPavi8ScAzwKql-FXsjet29o-1xgFQ",
  authDomain: "cocktail-recipe-app-4b108.firebaseapp.com",
  projectId: "cocktail-recipe-app-4b108",
  storageBucket: "cocktail-recipe-app-4b108.appspot.com",
  messagingSenderId: "163802867559",
  appId: "1:163802867559:web:d63736fae1f5d4f93971c2",
  measurementId: "G-BE5CTFFCLK"
};


const app = initializeApp(firebaseConfig);
const auth= getAuth(app); 
const provider = new GoogleAuthProvider();  
const firestore = getFirestore(app); 
export {app, auth, provider, firestore};