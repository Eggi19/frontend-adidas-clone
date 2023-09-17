// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwXiHMUYCncjEDezJboJKbTytFmAl94aY",
  authDomain: "e-commerse-fe841.firebaseapp.com",
  projectId: "e-commerse-fe841",
  storageBucket: "e-commerse-fe841.appspot.com",
  messagingSenderId: "5613147658",
  appId: "1:5613147658:web:b5a6389513a9e280bd71f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)