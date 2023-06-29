import React from "react";
import { signOut } from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore"
import { auth, db } from "./App";
import dateFormat from "dateformat";

export default function TimeLogger(props) {

    const [timeData, setTimeData] = React.useState([]);

    const timedataCollectionRef = collection(db, "timedata");

    const [newNumber, setNewNumber] = React.useState(null);

    const [showForm, setShowForm] = React.useState(true);

    const [todayMinutes, setTodayMinutes] = React.useState(0);

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

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(newNumber);
        if (newNumber !== null) {
            try {
                await addDoc(timedataCollectionRef, {
                    data: newNumber,
                    submittedAt: new Date(),
                    authorDisplayName: auth.currentUser.displayName, 
                    authorEmail: auth.currentUser.email,
                });
                getTimeData();
                setNewNumber(null);
            } catch (err) {
                console.log(err)
            }
        }
    }

    console.log(timeData[0])

    const getStats = () => {
        setShowForm(prev => !prev);
        //get todays minutes for this user
        let todayMinutesVar = 0;
        for (let i = 0; i < timeData.length; i++) {
            if (auth.currentUser.email === timeData[i].authorEmail) {
                if (dateFormat(timeData[i].submittedAt.toDate(), 'yyyy-mm-dd') === dateFormat(new Date(), 'yyyy-mm-dd')) {
                    todayMinutesVar += timeData[i].data;
                }
            }
            setTodayMinutes(todayMinutesVar);
        }
    }

    return (
        <div className="timelogger-container card">
            <button onClick={getStats}>{ showForm ? "show stats" : "show form"}</button>
            { showForm ? 
                <form onSubmit={e => handleSubmit(e)}>
                    <label htmlFor="time">Submit minutes to profile:</label>
                    <input onChange={(e) => setNewNumber(Number(e.target.value))} type="number" name="time" id="time" 
                    placeholder="enter minutes..." value={newNumber}
                    min={0} />
                    <input type="submit" className="submit button" value="SUBMIT"/>
                </form> :
                <div>Today's minutes: {todayMinutes}</div>
            }
            <div>
                <button className="logout" onClick={logout}>LOGOUT</button>
            </div>
        </div>
    )
}