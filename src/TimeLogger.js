import React from "react";
import { signOut } from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore"
import { auth, db } from "./App";
import dateFormat from "dateformat";

export default function TimeLogger(props) {

    const [timeData, setTimeData] = React.useState([]);

    const timedataCollectionRef = collection(db, "timedata");

    const [newNumber, setNewNumber] = React.useState("");

    const [showForm, setShowForm] = React.useState(true);

    const [stats, setStats] = React.useState({});

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
        if (newNumber !== "") {
            try {
                await addDoc(timedataCollectionRef, {
                    data: newNumber,
                    submittedAt: new Date(),
                    authorDisplayName: auth.currentUser.displayName, 
                    authorEmail: auth.currentUser.email,
                });
                getTimeData();
                setNewNumber("");
            } catch (err) {
                console.log(err)
            }
        }
    }

    // console.log(newNumber)

    const getStats = () => {
        setShowForm(prev => !prev);
        let todayMinutesVar = 0;
        let lastSevenDaysTotal = 0;
        for (let i = 0; i < timeData.length; i++) {
            if (auth.currentUser.email === timeData[i].authorEmail) {
                if (dateFormat(timeData[i].submittedAt.toDate(), 'yyyy-mm-dd') === dateFormat(new Date(), 'yyyy-mm-dd')) {
                    todayMinutesVar += timeData[i].data;
                }
                if (new Date() - 604800000 < timeData[i].submittedAt.toDate() - 0 
                    && timeData[i].submittedAt.toDate() - 0 < new Date()) {
                    lastSevenDaysTotal += timeData[i].data;
                }
            }
        }
        setStats({today: todayMinutesVar, sevenDaysTotal: lastSevenDaysTotal, sevenDaysAvg: lastSevenDaysTotal / 7});
    }

    return (
        <div className="timelogger-container card">
            <button onClick={getStats} className="show-stat">{ showForm ? "show stats" : "show input"}</button>
            { showForm ?
                <form onSubmit={e => handleSubmit(e)}>
                    <label htmlFor="time">Submit minutes to profile:</label>
                    <input value={newNumber} onChange={(e) => setNewNumber(Number(e.target.value))} type="number" name="time" id="time" 
                    placeholder="enter minutes..."
                    min={0} />
                    <input type="submit" className="submit button" value="SUBMIT"/>
                </form>
                 :
                <div>
                    <p>Today's minutes: {stats.today}</p>
                    <p>Last 7 seven days total: {stats.sevenDaysTotal}</p>
                    <p>Last 7 seven days average: {stats.sevenDaysAvg.toFixed(2)}</p>
                </div>
             }
            <div>
                <button className="logout" onClick={logout}>LOGOUT</button>
            </div>
        </div>
    )
}