import React from 'react';
import CountdownTimer from './CountdownTimer';
import Footer from './Footer';
import TimeLogger from './TimeLogger';
import Login from './Login';
import NoiseGenerator from './NoiseGenerator';
import { getFirestore } from 'firebase/firestore';

import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBUQMMvPsKzTBs0hhNL6u5quGS0YnT_0Xs",
  authDomain: "productivity-timer-b3d35.firebaseapp.com",
  projectId: "productivity-timer-b3d35",
  storageBucket: "productivity-timer-b3d35.appspot.com",
  messagingSenderId: "289344939599",
  appId: "1:289344939599:web:c11c3957c8bdb177eeac3a",
  measurementId: "G-9S74TY2L0H"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

function App() {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
        auth.onAuthStateChanged(user => user ? setIsLoggedIn(true) : setIsLoggedIn(false));
        document.title = 'Productivity Timer';
    }, [])

    return (
        <div className='page-container'>
            <main>
                <div className='app-container'>
                    <NoiseGenerator />
                    <CountdownTimer />
                    {isLoggedIn ? <TimeLogger setIsLoggedIn={setIsLoggedIn} /> : <Login setIsLoggedIn={setIsLoggedIn} />}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default App;
