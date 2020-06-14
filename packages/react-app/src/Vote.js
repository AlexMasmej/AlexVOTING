import React from "react";
import { ethers } from "ethers";
import { Button } from "antd";
const axios = require("axios");

export default function SmartContractWallet(props) {
    const voteButton = (emoji) => {
        return (
            <Button
                size='large'
                onClick={() => {
                    castVote(emoji, translateEmoji(emoji));
                }}
            >
                {emoji}
            </Button>
        );
    };

    const castVote = async (emoji, emojiName) => {
        let timestamp = Date.now();
        console.log("timestamp", timestamp);
        console.log("props.injectedProvider", props.injectedProvider);
        let signer = props.injectedProvider.getSigner();
        console.log("props.address", props.address);
        let message = "emojivote" + emojiName + timestamp;
        console.log("message", message);
        let result = await signer.signMessage(message);
        console.log("result", result);
        let recovered = await ethers.utils.verifyMessage(message, result);
        console.log("recovered", recovered);

        /// CHANGE THIS TO YOUR ZAP:
        axios
            .get(
                "https://hooks.zapier.com/hooks/catch/4100330/oi1jxzj/?address=" +
                    props.address +
                    "&vote=" +
                    emoji +
                    "&timestamp=" +
                    timestamp +
                    "&signature=" +
                    result
            )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div className='vote-container'>
            <div className='sub-container'>
                <h3
                    style={{
                        textAlign: "center",

                        fontWeight: "bold",
                    }}
                >
                    🗳 Use $ALEX to vote for the daily habit I will adopt in
                    July.
                </h3>
                <ul>
                    <li>
                        1 $ALEX = 1 vote. The vote itself is free: it is a
                        signature, not a transaction.
                    </li>
                    <li>
                        All $ALEX tokens owned by your address at the end will
                        count.
                    </li>
                    <li>
                        If you vote more than once with the same address, only
                        the last one will count.
                    </li>
                    <li>
                        Results will be displayed here at the end of the vote.
                    </li>
                    <li>
                        Votes will be counted on Wednesday 17th June, 12AM CEST
                    </li>
                    <li>
                        After voting, please keep your $ALEX in your wallet
                        until the final count.
                    </li>
                </ul>
            </div>

            <div className='button-container'>
                {voteButton("💦 Jog 5 miles")}
                {voteButton("🥩 Stop eating red meat")}
                {voteButton("🧘‍♂️ Meditate 15 minutes")}
                {voteButton("⏰ Wake up at 6AM")}
            </div>
        </div>
    );
}

const translateEmoji = (emoji) => {
    if (emoji === "🦁") {
        return "LION";
    } else if (emoji === "🐮") {
        return "COW";
    } else if (emoji === "🐭") {
        return "MOUSE";
    } else if (emoji === "🦊") {
        return "FOX";
    } else if (emoji === "🐶") {
        return "DOG";
    } else if (emoji === "🐰") {
        return "RABBIT";
    } else if (emoji === "🐸") {
        return "FROG";
    }
};
