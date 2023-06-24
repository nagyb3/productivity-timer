import React from "react";
import { signInWithPopup } from "firebase/auth"
import { googleProvider, auth } from "./App";

export default function Login(props) {
    
    const logInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            props.setIsLoggedIn(true)
        } catch (err) {
            console.error(err)
        }
    }
    
    return (
        <div className="login-container card">
            <button className="log-in-google" onClick={logInWithGoogle}>LOGIN WITH GOOGLE</button>
        </div>
    )
}