// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB9JKt4ABzUlPk1sdks52T-BQDUpbOVT0",
  authDomain: "vaani-4787f.firebaseapp.com",
  projectId: "vaani-4787f",
  storageBucket: "vaani-4787f.firebasestorage.app",
  messagingSenderId: "874127052016",
  appId: "1:874127052016:web:1e0f8a32b655757cf40635",
  measurementId: "G-CJK2PL8T59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
//const analytics = getAnalytics(app);



// export default login 