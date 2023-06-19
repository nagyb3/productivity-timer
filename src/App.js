import React from 'react';
import CountdownTimer from './CountdownTimer';
import Footer from './Footer';
import Header from './Header';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUQMMvPsKzTBs0hhNL6u5quGS0YnT_0Xs",
  authDomain: "productivity-timer-b3d35.firebaseapp.com",
  projectId: "productivity-timer-b3d35",
  storageBucket: "productivity-timer-b3d35.appspot.com",
  messagingSenderId: "289344939599",
  appId: "1:289344939599:web:c11c3957c8bdb177eeac3a",
  measurementId: "G-9S74TY2L0H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);


function App() {
    return (
        <div className='app-container'>
            <Header></Header>
            <CountdownTimer />
            <Footer></Footer>
        </div>
    );
}

export default App;
