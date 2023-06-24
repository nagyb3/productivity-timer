import React from "react";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore"
import { auth, db } from "./App";

export default function TimeLogger(props) {

    const [timeData, setTimeData] = React.useState([]);

    const timedataCollectionRef = collection(db, "timedata");

    const [newNumber, setNewNumber] = React.useState(0);

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

    function handleSubmit(e) {
        e.preventDefault();
        // console.log(newNumber);
        setNewNumber(0);
    }

    return (
        <div className="timelogger-container card">
            <form onSubmit={e => handleSubmit(e)}>
                <label htmlFor="time">Submit minutes to profile:</label>
                <input onChange={(e) => setNewNumber(e.target.value)} value={newNumber} type="number" name="time" id="time" 
                placeholder="enter minutes..."
                min={0} />
                <input type="submit" className="submit button" value="SUBMIT"/>
            </form>
            <div>
                <button className="logout" onClick={logout}>LOGOUT</button>
            </div>
        </div>
    )
}