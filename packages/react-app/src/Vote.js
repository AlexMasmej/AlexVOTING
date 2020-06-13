import React from 'react'
import { ethers, Wallet } from "ethers";
import { Card, Button } from 'antd';
const axios = require('axios');

export default function SmartContractWallet(props) {

  const voteButton = (emoji)=>{
    return (
      <Button onClick={()=>{
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
            <h2>🗳 Pick the challenge I will do everyday next month:</h2>
          </div>
        )}
        size="large"
        style={{margin: "auto" }}
        >
          {voteButton("💦 Jog 5 miles")}
          {voteButton("🥩 Stop eating red meat")}
          {voteButton("🧘‍♂️ Meditate 15 minutes")}
          {voteButton("⏰ Wake up at 6AM")}
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
