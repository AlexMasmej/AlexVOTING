import React from "react";
import { useTimestamp } from "./hooks";

export default function TimeReport(props) {
    // pick a time here: https://www.unixtimestamp.com/index.php and paste it here:
    const TIME_WHEN_VOTES_WILL_BE_COUNTED = 1592438400;

    const timestamp = useTimestamp(props.mainnetProvider);
    const timeLeft = TIME_WHEN_VOTES_WILL_BE_COUNTED - timestamp;

    let date = new Date(timestamp * 1000);

    return (
        <div className='time-report'>
            <div style={{ display: "none" }}>
                at mainnet timestamp: {TIME_WHEN_VOTES_WILL_BE_COUNTED}
            </div>
            <div style={{ display: "none" }}>
                current timestamp: {timestamp}
            </div>

            <p style={{ textAlign: "center" }}>
                <strong>{prettyTimeFromNow(timeLeft)} left to vote</strong>
            </p>
        </div>
    );
}

function prettyTimeFromNow(timeLeft) {
    var sec_num = timeLeft;
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return hours + " hours, " + minutes + " minutes, " + seconds + " seconds";
}
