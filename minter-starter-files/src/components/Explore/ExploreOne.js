import React, { useState, useEffect, useRef } from "react";
import { defaultImg, sliceOver } from "../../utils/util";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { Link } from "react-router-dom";

const initData = {
  pre_heading: "Exclusive Assets",
  heading: "Explore",
  btn_1: "View All",
  btn_2: "Load More",
};

const ipfsPrefix = "https://ipfs.io/ipfs/";

const ExploreOne = () => {
  const Web3Api = useMoralisWeb3Api();
  const { isWeb3Enabled } = useMoralis();

  const fetchSearchNFTs = async () => {
    const options = { q: "ape", chain: "goerli", filter: "global", limit: 20 };
    const NFTs = await Web3Api.token.searchNFTs(options);

    console.log(NFTs.result);
    setNFTs(NFTs.result);
  };

  const [initData, setInitData] = useState([]);
  const [NFTs, setNFTs] = useState([]);

  useEffect(() => {
    if (!isWeb3Enabled) return;
    fetchSearchNFTs();
  }, [isWeb3Enabled]);

  return (
    <section className="explore-area load-more p-0">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Intro */}
            <div className="intro d-flex justify-content-between align-items-end m-0">
              <div className="intro-content">
                <span>{initData.pre_heading}</span>
                <h3 className="mt-3 mb-0">{initData.heading}</h3>
              </div>
              <div className="intro-btn">
                <a className="btn content-btn" href="/explore-3">
                  {initData.btn_1}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row items">
          {NFTs?.map((item, idx) => {
            const meta = JSON.parse(item.metadata);
            const ipfsUrl = meta.image.split("//")[1];

            return (
              <div key={`exo_${idx}`} className="col-12 col-sm-6 col-lg-3">
                <div className="card">
                  <div className="image-over">
                    <Link
                      to={`/item-details/${item.token_address}`}
                      state={{
                        tokenId: item.token_id,
                        createdAt: item.created_at,
                        tokenAddress: item.token_address,
                        imgUrl: ipfsPrefix + ipfsUrl,
                        blockNumber: item.block_number_minted,
                        tokenHash: item.token_hash,
                      }}
                    >
                      <a href="#">
                        <img
                          className="card-img-top"
                          src={meta.image ? ipfsPrefix + ipfsUrl : defaultImg}
                          alt=""
                        />
                      </a>
                    </Link>
                  </div>
                  {/* Card Caption */}
                  <div className="card-caption col-12 p-0">
                    {/* Card Body */}
                    <div className="card-body">
                      <a href="/item-details">
                        <h5 className="mb-0">{meta.name}</h5>
                      </a>

                      <div className="card-bottom d-flex justify-content-between"></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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

export default ExploreOne;
