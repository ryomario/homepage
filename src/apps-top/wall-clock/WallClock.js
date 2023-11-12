import { useEffect, useState } from "react"
import './index.css';
import { getTimeNowInSeconds } from "./utils";

export default function WallClock() {
    const [initialTime, setInitialTime] = useState(getTimeNowInSeconds());

    useEffect(() => {
        setInitialTime(getTimeNowInSeconds());
    },[]);

    return (
        <div className="wall-clock circle animate" style={{ '--time': initialTime }}>
            <div className="wall-clock-nums">
                <span num="12" className="numeric"></span>
                <span num="12.5"></span>
                <span num="1"></span>
                <span num="1.5"></span>
                <span num="2"></span>
                <span num="2.5"></span>
                <span num="3" className="numeric"></span>
                <span num="3.5"></span>
                <span num="4"></span>
                <span num="4.5"></span>
                <span num="5"></span>
                <span num="5.5"></span>
                <span num="6" className="numeric"></span>
                <span num="6.5"></span>
                <span num="7"></span>
                <span num="7.5"></span>
                <span num="8"></span>
                <span num="8.5"></span>
                <span num="9" className="numeric"></span>
                <span num="9.5"></span>
                <span num="10"></span>
                <span num="10.5"></span>
                <span num="11"></span>
                <span num="11.5"></span>
            </div>
            <div className="wall-clock-hands">
                <span className="wall-clock-hands__hour"></span>
                <span className="wall-clock-hands__minute"></span>
                <span className="wall-clock-hands__second"></span>
            </div>
        </div>
    );
}