import React from 'react'
import { ethers } from "ethers";
import { useTimestamp } from "./hooks"
import { Card } from 'antd';

export default function TimeReport(props) {

  // pick a time here: https://www.unixtimestamp.com/index.php and paste it here:
  const TIME_WHEN_VOTES_WILL_BE_COUNTED = 1592352000

  const timestamp = useTimestamp(props.mainnetProvider)
  const timeLeft = TIME_WHEN_VOTES_WILL_BE_COUNTED - timestamp

  let date = new Date(timestamp*1000)

  return (
    <div>
      <Card
        title={(
          <div>
            <h2 style={{color: "black"}}>🕰  Votes will be counted on Wednesday 17th June, 12AM CEST</h2>
          </div>
        )}
        size="large"
        style={{margin: "auto"
}}
        >
          <div style={{display: "none"}}>
           at mainnet timestamp: {TIME_WHEN_VOTES_WILL_BE_COUNTED}
          </div>
          <div style={{display: "none"}}>
            current timestamp: {timestamp}
          </div>
          <div>
            <h1 style={{color: "black"}}><strong>{prettyTimeFromNow(timeLeft)} left to vote</strong></h1>
          </div>
      </Card>
  
    </div>
  );

}

function prettyTimeFromNow(timeLeft) {
    var sec_num = timeLeft
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+' hours, '+ minutes+' minutes, '+seconds+' seconds';
}
