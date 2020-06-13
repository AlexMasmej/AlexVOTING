import React, { useEffect, useState } from 'react'
import { ethers } from "ethers";
import { useTimestamp } from "./hooks"
import { Card } from 'antd';

export default function TimeReport(props) {

  const [votes, setVotes] = useState([])
  const [results, setResults] = useState([])

  useEffect(()=>{
    try{
      let loadedVotes = require("./validVotes.json")
      setVotes(loadedVotes)
      let newResults = {}
      for(let v in loadedVotes){
        if(newResults[loadedVotes[v].vote]){
          newResults[loadedVotes[v].vote] = newResults[loadedVotes[v].vote].add(loadedVotes[v].balance)
        }else{
          newResults[loadedVotes[v].vote] = ethers.utils.bigNumberify(loadedVotes[v].balance)
        }
      }
      setResults(newResults)
    }catch(e){console.log("ERR",e)}
  },[])

  let displayVotes = []
  let winner
  for(let r in results){
    let floatValue = parseFloat((results[r])/10**4)
    if( typeof winner == "undefined" || winner.floatValue < floatValue){
      winner = {
        vote:r,
        floatValue:floatValue,
      }
    }
    displayVotes.push(
      <div key={"vote"+r}>
        <strong>{r}</strong> collected <strong>{floatValue.toFixed(4)}</strong> $ALEX votes
      </div>
    )
  }

  return (
    <div>
      <Card
        title={(
          <div>
            <h1>📑  Votes so far: {winner?winner.vote+" is winning!":""}</h1>
          </div>
        )}
        size="large"
        style={{ width: "100%", margin: "auto" }}
        >
          <h1>{displayVotes}</h1>
      </Card>
    </div>
  );

}
