import React from "react";
import { signOut } from "firebase/auth";
import { googleProvider, auth } from "./App";

export default function TimeLogger(props) {
    
    const logout = async () => {
        await signOut(auth);
        props.setIsLoggedIn(false);
    }


    return (
        <div className="timelogger-container card">
            <button className="logout" onClick={logout}>LOGOUT</button>
        </div>
    )
}