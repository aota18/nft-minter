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
  const [NFTs, setNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const Web3Api = useMoralisWeb3Api();
  const { isWeb3Enabled } = useMoralis();

  const fetchStakedNFTs = async () => {
    try {
      setIsLoading(true);
      const options = {
        chain: "mumbai",
        token_address: "0xAdB9fe0E415e4C8Ef41C4d0cC20C77e1cf55DE3F",
      };
      const myCollections = await Web3Api.account.getNFTsForContract(options);

      console.log(myCollections);
      setNFTs(myCollections.result);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isWeb3Enabled) return;

    fetchStakedNFTs();
  }, [isWeb3Enabled]);

  const [data, setData] = useState({
    data: {},
    tabData_1: [],
    tabData_2: [],
    tabData_3: [],
    filterData: [],
  });

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
              <div className="intro-btn">
                <a className="btn content-btn" href="/explore-3">
                  {initData.btn_1}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row items">
          {NFTs.length === 0 ? (
            <div className="col-12 col-sm-6 col-lg-3 text-center p-4">
              No Staked NFTs now.
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
                      <Link
                        to={`/item-details/${item.token_address}`}
                        state={{
                          tokenId: item.token_id,
                          createdAt: item.created_at,
                          tokenAddress: item.token_address,
                          imgUrl: ipfsUrl,
                          blockNumber: item.block_number_minted,
                          tokenHash: item.token_hash,
                        }}
                      >
                        <a href="#">
                          <img
                            className="card-img-top"
                            src={meta.image ? ipfsUrl : defaultImg}
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
