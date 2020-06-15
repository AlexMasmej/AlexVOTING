import React, { useState } from "react";
import "antd/dist/antd.css";
import { ethers } from "ethers";
import "./App.css";
import { useExchangePrice, useCustomContractReader, useCustomContractLoader } from "./hooks";
import { Account } from "./components";

import Vote from "./Vote.js";
import TimeReport from "./TimeReport.js";
import VoteReport from "./VoteReport.js";

/// CHANGE THIS TO YOUR INFURA ID
const mainnetProvider = new ethers.providers.InfuraProvider(
    "mainnet",
    "2717afb6bf164045b5d5468031b93f87"
);
const localProvider = mainnetProvider; //new ethers.providers.JsonRpcProvider(process.env.REACT_APP_PROVIDER?process.env.REACT_APP_PROVIDER:"http://localhost:8545")

function App() {
    const [address, setAddress] = useState();
    const [injectedProvider, setInjectedProvider] = useState();
    const price = useExchangePrice(mainnetProvider);

    const ERC20  = [{
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },]
      //useCustomContractLoader(provider,contractName,address)
  const alexTokenContract = useCustomContractLoader(mainnetProvider,"ALEX","0x8BA6DcC667d3FF64C1A2123cE72FF5F0199E5315",ERC20)
  console.log("alexTokenContract",alexTokenContract)
  //const alexBalance = useContractReader(props.contracts,props.name,"balanceOf",[props.address],1777);
  const alexBalance = useCustomContractReader(alexTokenContract,"balanceOf",[address],1777,(hex)=>{
      return hex.toNumber()/10**4
  })
  console.log("alexBalance",alexBalance)



    // token balance for address on ERC20: 

    return (
        <div className='App'>
            <header>
                <a href='https://medium.com/@AlexMasmej/introducing-control-my-life-use-my-cryptocurrency-alex-to-vote-8d62471963cd'>
                    CONTROL MY LIFE via $ALEX
                </a>
                <div className='account'>
                    <Account
                        address={address}
                        setAddress={setAddress}
                        localProvider={localProvider}
                        injectedProvider={injectedProvider}
                        setInjectedProvider={setInjectedProvider}
                        mainnetProvider={mainnetProvider}
                        price={price}
                    />
                </div>
            </header>

            <div className='body-container' style={{padding:8,borderBottom:"1px solid #EEEEEE"}}>
                Your $ALEX holdings: {alexBalance}
            </div>
            

            <div className='body-container'>
                <Vote
                    address={address}
                    injectedProvider={injectedProvider}
                    localProvider={localProvider}
                />
                <TimeReport mainnetProvider={mainnetProvider} />
                <div style={{display: 'none'}}>
                    <VoteReport />
                </div>
                <p>💰 Don't have any $ALEX token to vote? Get some here:</p>
            </div>

            <div className='uniswap-container'>
                <iframe
                    title='uniswap'
                    src='https://uniswap.exchange/swap?outputCurrency=0x8ba6dcc667d3ff64c1a2123ce72ff5f0199e5315&theme=light'
                    height='660px'
                    width='100%'
                    style={{
                        border: 0,
                        margin: "auto",
                        display: "block",
                        borderradius: 10,
                        maxwidth: "600px",
                        minwidth: "300px",
                    }}
                />
            </div>
            <div className='producthunt-badge' style={{display: 'none'}}>
            <a href="https://www.producthunt.com/posts/magic-11?utm_source=badge-featured&amp;utm_medium=badge&amp;utm_souce=badge-magic-11" target="_blank" rel="noopener noreferrer"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=190558&amp;theme=light" alt="Magic - Use the slickest magic link login in your app | Product Hunt Embed" width="250px" height="54px"/></a>
            </div>
        </div>
    );
}

export default App;
