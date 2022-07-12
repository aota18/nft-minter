import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { Link } from "react-router-dom";
import { defaultImg, gweiToEth, sliceOver } from "../../utils/util";

const initData = {
  preHeading: "Rewards",
  heading: "Staked Pools",
  btnText: "View All",
};

const Rewards = () => {
  const web3 = createAlchemyWeb3(process.env.REACT_APP_ALCHEMY_KEY);
  const [NFTs, setNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const Web3Api = useMoralisWeb3Api();
  const { isWeb3Enabled } = useMoralis();

  const fetchStakedNFTs = async () => {
    try {
      setIsLoading(true);
      const options = {
        chain: process.env.REACT_APP_CHAIN,
        address: process.env.REACT_APP_STAKING_ADDRESS,
      };

      const myCollections = await Web3Api.account.getNFTs(options);

      console.log(myCollections);
      setNFTs(myCollections.result);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const unstake = async (tokenId) => {
    const rewardAddress = process.env.REACT_APP_REWARD_ADDRESS;
    const stakingAddress = process.env.REACT_APP_STAKING_ADDRESS;

    try {
      const contractABI = require("../../contracts/artifacts/contracts/NFTStaking.sol/NFTStaking.json");
      const abi = contractABI.abi;
      window.contract = await new web3.eth.Contract(abi, stakingAddress);

      const transactionParameters = {
        to: stakingAddress,
        from: window.ethereum.selectedAddress,
        data: window.contract.methods.unstake([parseInt(tokenId)]).encodeABI(),
      };

      try {
        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });

        console.log("success to unstaking address", txHash);
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isWeb3Enabled) return;

    fetchStakedNFTs();
  }, [isWeb3Enabled]);

  return (
    <section className="activity-area load-more">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Intro */}
            <div className="intro d-flex justify-content-between align-items-end m-0">
              <div className="intro-content">
                <span>{initData.preHeading}</span>
                <h3 className="mt-3 mb-0">{initData.heading}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="row items">
          {isLoading ? (
            <div className="flex flex-col col-12 col-sm-12 col-lg-12 text-center p-4">
              Loading...
            </div>
          ) : NFTs.length === 0 ? (
            <div className="flex flex-col col-12 col-sm-12 col-lg-12 text-center p-4">
              <div>No Staked NFTs for now</div>
              <a className="btn btn-bordered-white m-4" href="/author">
                <i className="icon-note mr-2" />
                {"Let's stake!"}
              </a>
            </div>
          ) : (
            NFTs?.map((item, idx) => {
              const meta = JSON.parse(item.metadata);
              const ipfsUrl = meta.image.split("//")[1];

              return (
                <div key={`exo_${idx}`} className="col-12 col-sm-6 col-lg-3">
                  <div className="card">
                    <div className="image-over">
                      <a href="#">
                        <img
                          className="card-img-top"
                          src={meta.image ? ipfsUrl : defaultImg}
                          alt=""
                        />
                      </a>
                    </div>
                    {/* Card Caption */}
                    <div className="card-caption col-12 p-0">
                      {/* Card Body */}
                      <div className="card-body">
                        <a
                          href="#"
                          onClick={() => {
                            let answer = window.confirm(
                              "Do you want to unstake this token?"
                            );

                            if (answer) {
                              unstake(item.token_id);
                            }
                          }}
                        >
                          <h5 className="mb-0">{meta.name}</h5>
                        </a>

                        <div className="card-bottom d-flex justify-content-between"></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="row">
          <div className="col-12 text-center">
            {/* <a id="load-btn" className="btn btn-bordered-white mt-5" href="#">
              {initData.btn_2}
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rewards;
