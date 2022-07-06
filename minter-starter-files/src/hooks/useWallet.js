import React, { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
  disconnectWallet,
} from "../utils/interact";

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWalletAddress(address);

    addWalletListener();
  }, []);

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log("Write a message in the text-field above");
        } else {
          setWalletAddress("");
          console.log("Connect to Metamask using the top right button");
        }
      });
    } else {
      console.log(
        " You must install Metamask, a virtual Ethereum wallet, in your browser."
      );
    }
  };

  const connectWalletPressed = async () => {
    //TODO: implement
    const walletResponse = await connectWallet();
    setWalletAddress(walletResponse.address);
  };

  const logout = async () => {
    await disconnectWallet();
    setWalletAddress(null);
  };

  return { connectWalletPressed, walletAddress, logout };
};
