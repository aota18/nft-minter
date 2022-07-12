import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import AuthorProfile from "../AuthorProfile/AuthorProfile";
import Explore from "../Explore/ExploreSix";

const initData = {
  preHeading: "My NFT",
  heading: "Owned NFTs",
  btnText: "Let's Create!",
};

const Author = () => {
  const Web3Api = useMoralisWeb3Api();
  const { isWeb3Enabled } = useMoralis();

  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState([]);

  const fetchNFTsForContract = async () => {
    try {
      setIsLoading(true);
      const options = {
        chain: process.env.REACT_APP_CHAIN,
        address: window.ethereum.selectedAddress,
      };
      const myCollections = await Web3Api.account.getNFTs(options);

      setCollections(myCollections.result);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isWeb3Enabled) return;
    fetchNFTsForContract();
  }, [isWeb3Enabled]);

  return (
    <section className="author-area explore-area popular-collections-area">
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

        <div className="row justify-content-between">
          <div className="col-12 col-md-8">
            {isLoading ? (
              <div className="flex flex-col col-12 col-sm-12 col-lg-12 text-center p-4">
                Loading...
              </div>
            ) : collections.length === 0 ? (
              <div className="flex flex-col col-12 col-sm-12 col-lg-12 text-center p-4">
                <div>You don't have any NFTs.</div>
                <a className="btn btn-bordered-white m-4" href="/create">
                  <i className="icon-note mr-2" />
                  {initData.btnText}
                </a>
              </div>
            ) : (
              <Explore collections={collections} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Author;
