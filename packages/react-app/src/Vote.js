import React from 'react'
import { ethers, Wallet } from "ethers";
import { Card, Button } from 'antd';
const axios = require('axios');

export default function SmartContractWallet(props) {

  const voteButton = (emoji)=>{
    return (
      <Button size="large" onClick={()=>{
        castVote(emoji,translateEmoji(emoji))
      }}>{emoji}</Button>
    )
  }

  const castVote = async (emoji,emojiName)=>{
    let timestamp = Date.now()
    console.log("timestamp",timestamp)
    console.log("props.injectedProvider",props.injectedProvider)
    let signer = props.injectedProvider.getSigner()
    console.log("props.address",props.address)
    let message = "emojivote"+emojiName+timestamp
    console.log("message",message)
    let result = await signer.signMessage(message)
    console.log("result",result)
    let recovered = await ethers.utils.verifyMessage ( message , result )
    console.log("recovered",recovered)

    /// CHANGE THIS TO YOUR ZAP: 
    axios.get('https://hooks.zapier.com/hooks/catch/4100330/oi1jxzj/?address='+props.address+'&vote='+emoji+'&timestamp='+timestamp+'&signature='+result)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  return (
    <div>
      <Card
        title={(
          <div>
            <h1 style={{color: "black"}}><strong>🗳 Use $ALEX to vote for the daily habit I will adopt in July.</strong></h1>
            <h3 style={{color: "grey"}}>Rule: 1 $ALEX = 1 vote. The vote itself is free: it is a signature, not a transaction.<br></br>All $ALEX tokens owned by your address at the end will count.<br></br>If you vote more than once with the same address, only the last one will count.<br></br>Results will be displayed here at the end of the vote.<br></br><br></br><strong style={{color: "black"}}>After voting, please keep your $ALEX in your wallet until the final count.</strong></h3>
          </div>
        )}
        size="large"
        >
        <div style={{background: "rgb(61,0,255)",
background: "radial-gradient(circle, rgba(150,0,500,100) 0%, rgba(0,10,25,190) 100%, rgba(255,255,255,1) 50%)"}}>
          <br></br>   
          <br></br>
          {voteButton("💦 Jog 5 miles")}
          <br></br>
          <br></br>     
          {voteButton("🥩 Stop eating red meat")}
                    <br></br>
                    <br></br>
          {voteButton("🧘‍♂️ Meditate 15 minutes")}
                    <br></br>               <br></br> 
 
          {voteButton("⏰ Wake up at 6AM")}
                    <br></br>     
                              <br></br><br></br>       

          </div>
      </Card>
    </div>
  );

}





const translateEmoji = (emoji)=>{
  if(emoji==="🦁"){
    return "LION"
  } else if(emoji==="🐮"){
    return "COW"
  } else if(emoji==="🐭"){
    return "MOUSE"
  } else if(emoji==="🦊"){
    return "FOX"
  } else if(emoji==="🐶"){
    return "DOG"
  } else if(emoji==="🐰"){
    return "RABBIT"
  } else if(emoji==="🐸"){
    return "FROG"
  }
}
