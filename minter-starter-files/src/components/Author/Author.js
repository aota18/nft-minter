import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import AuthorProfile from "../AuthorProfile/AuthorProfile";
import Explore from "../Explore/ExploreSix";

const Author = () => {
  const Web3Api = useMoralisWeb3Api();
  const { isWeb3Enabled } = useMoralis();

  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState([]);

  const fetchNFTsForContract = async () => {
    try {
      setIsLoading(true);
      const options = {
        chain: "mumbai",
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
        <div className="row justify-content-between">
          <div className="col-12 col-md-8">
            <Explore collections={collections} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Author;
