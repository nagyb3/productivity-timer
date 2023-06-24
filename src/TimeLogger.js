import React from "react";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore"
import { auth, db } from "./App";

export default function TimeLogger(props) {

    const [timeData, setTimeData] = React.useState([]);

    const timedataCollectionRef = collection(db, "timedata");

    const logout = async () => {
        await signOut(auth);
        props.setIsLoggedIn(false);
    }

    const getTimeData = async () => {
        try {
          const data = await getDocs(timedataCollectionRef);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(), 
            id: doc.id
          }));
          console.log(filteredData);
          setTimeData(filteredData);
        } catch (err) {
          console.error(err);
        }
    };

    React.useEffect(() => {
        getTimeData();
    }, []);

    return (
        <div className="timelogger-container card">
            <button className="logout" onClick={logout}>LOGOUT</button>
        </div>
    )
}