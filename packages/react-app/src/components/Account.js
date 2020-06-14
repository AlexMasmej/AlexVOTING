import React, { useEffect } from "react";
import { ethers } from "ethers";
import BurnerProvider from "burner-provider";
import Web3Modal from "web3modal";
import { Balance, Address } from ".";
import { usePoller } from "../hooks";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Button } from "antd";

const INFURA_ID = "c22debbf96e04d848a68a64757d9cb00"; // MY INFURA_ID, SWAP IN YOURS!

const web3Modal = new Web3Modal({
    //network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions: {
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                infuraId: INFURA_ID,
            },
        },
    },
});

export default function Account(props) {
    const createBurnerIfNoAddress = () => {
        if (!props.injectedProvider && props.localProvider) {
            if (
                props.localProvider.connection &&
                props.localProvider.connection.url
            ) {
                props.setInjectedProvider(
                    new ethers.providers.Web3Provider(
                        new BurnerProvider(props.localProvider.connection.url)
                    )
                );
            } else if (
                props.localProvider._network &&
                props.localProvider._network.name
            ) {
                props.setInjectedProvider(
                    new ethers.providers.Web3Provider(
                        new BurnerProvider(
                            "https://" +
                                props.localProvider._network.name +
                                ".infura.io/v3/" +
                                INFURA_ID
                        )
                    )
                );
            } else {
                props.setInjectedProvider(
                    new ethers.providers.Web3Provider(
                        new BurnerProvider(
                            "https://mainnet.infura.io/v3/" + INFURA_ID
                        )
                    )
                );
            }
        } else {
            pollInjectedProvider();
        }
    };
    useEffect(createBurnerIfNoAddress, [props.injectedProvider]);

    const pollInjectedProvider = async () => {
        if (props.injectedProvider) {
            let accounts = await props.injectedProvider.listAccounts();
            if (accounts && accounts[0] && accounts[0] != props.account) {
                //console.log("ADDRESS: ",accounts[0])
                if (typeof props.setAddress == "function")
                    props.setAddress(accounts[0]);
            }
        }
    };
    usePoller(
        () => {
            pollInjectedProvider();
        },
        props.pollTime ? props.pollTime : 1999
    );

    const loadWeb3Modal = async () => {
        const provider = await web3Modal.connect();
        //console.log("GOT CACHED PROVIDER FROM WEB3 MODAL",provider)
        props.setInjectedProvider(new ethers.providers.Web3Provider(provider));
        pollInjectedProvider();
    };

    const logoutOfWeb3Modal = async () => {
        const clear = await web3Modal.clearCachedProvider();
        //console.log("Cleared cache provider!?!",clear)
        setTimeout(() => {
            window.location.reload();
        }, 1);
    };

    let modalButtons = [];
    if (web3Modal.cachedProvider) {
        modalButtons.push(
            <Button
                key='logoutbutton'
                shape={"round"}
                onClick={logoutOfWeb3Modal}
            >
                logout
            </Button>
        );
    } else {
        modalButtons.push(
            <Button
                key='loginbutton'
                shape={"round"}
                type={"primary"}
                onClick={loadWeb3Modal}
            >
                connect
            </Button>
        );
    }

    React.useEffect(async () => {
        if (web3Modal.cachedProvider) {
            loadWeb3Modal();
        }
    }, []);

    return (
        <div className='address'>
            {props.address ? (
                <Address
                    value={props.address}
                    ensProvider={props.mainnetProvider}
                />
            ) : (
                "Connecting..."
            )}
            <Balance
                address={props.address}
                provider={props.injectedProvider}
                dollarMultiplier={props.price}
            />
            {modalButtons}
        </div>
    );
}
