import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { useLocation, useParams } from "react-router-dom";
import { defaultImg, defaultProfileImg, sliceOver } from "../../utils/util";

const initData = {
  itemImg: "/img/auction_2.jpg",
  date: "2022-03-30",
  tab_1: "Bids",
  tab_2: "History",
  tab_3: "Details",
  ownerImg: "/img/avatar_1.jpg",
  itemOwner: "Themeland",
  created: "15 Jul 2021",
  title: "Walking On Air",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
  price_1: "1.5 ETH",
  price_2: "$500.89",
  count: "1 of 5",
  size: "14000 x 14000 px",
  volume: "64.1",
  highest_bid: "2.9 BNB",
  bid_count: "1 of 5",
  btnText: "Place a Bid",
};

const tabData_1 = [
  {
    id: "1",
    img: "/img/avatar_1.jpg",
    price: "14 ETH",
    time: "4 hours ago",
    author: "@arham",
  },
  {
    id: "2",
    img: "/img/avatar_2.jpg",
    price: "10 ETH",
    time: "8 hours ago",
    author: "@junaid",
  },
  {
    id: "3",
    img: "/img/avatar_3.jpg",
    price: "12 ETH",
    time: "3 hours ago",
    author: "@yasmin",
  },
];

const tabData_2 = [
  {
    id: "1",
    img: "/img/avatar_6.jpg",
    price: "32 ETH",
    time: "10 hours ago",
    author: "@hasan",
  },
  {
    id: "2",
    img: "/img/avatar_7.jpg",
    price: "24 ETH",
    time: "6 hours ago",
    author: "@artnox",
  },
  {
    id: "3",
    img: "/img/avatar_8.jpg",
    price: "29 ETH",
    time: "12 hours ago",
    author: "@meez",
  },
];

const sellerData = [
  {
    id: "1",
    img: "/img/avatar_1.jpg",
    seller: "@ArtNoxStudio",
    post: "Creator",
  },
  {
    id: "2",
    img: "/img/avatar_2.jpg",
    seller: "Virtual Worlds",
    post: "Collection",
  },
];

const ItemDetails = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [basicData, setBasicData] = useState({});
  const [metadata, setMetadata] = useState({});

  const [init, setInit] = useState({
    initData: initData,
    tabData_1: tabData_1,
    tabData_2: tabData_2,
    sellerData: sellerData,
  });

  const location = useLocation();
  const { imgUrl, tokenAddress, tokenId, createdAt, blockNumber, tokenHash } =
    location.state;

  const Web3Api = useMoralisWeb3Api();
  const { isWeb3Enabled } = useMoralis();

  const fetchTokenIdMetadata = async () => {
    setIsLoading(true);
    try {
      const options = {
        address: tokenAddress,
        token_id: tokenId,
        chain: "goerli",
      };
      const result = await Web3Api.token.getTokenIdMetadata(options);
      setBasicData(result);
      const metadata = JSON.parse(result.metadata);
      setMetadata(metadata);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  const fetchNFTTransfersByBlock = async () => {
    // get NFT transfers by block number or block hash
    const options = { chain: "goerli", block_number_or_hash: blockNumber };

    const NFTTransfers = await Web3Api.native.getNFTTransfersByBlock(options);

    const tokenHistory = NFTTransfers.result.filter(
      (row) => row.token_id === tokenId
    );
    setHistory(tokenHistory);
  };
  useEffect(() => {
    if (!isWeb3Enabled) return;

    fetchTokenIdMetadata();
    fetchNFTTransfersByBlock();
  }, [isWeb3Enabled]);

  return (
    <section className="item-details-area">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-lg-5">
            <div className="item-info">
              <div className="item-thumb text-center">
                <img src={imgUrl ? imgUrl : defaultImg} alt="" />
              </div>
              <div className="card no-hover countdown-times my-4">
                <div
                  className="countdown d-flex justify-content-center"
                  data-date={init.initData.date}
                />
              </div>
              {/* Netstorm Tab */}
              <ul className="netstorm-tab nav nav-tabs" id="nav-tab">
                <li>
                  <a
                    id="nav-profile-tab"
                    data-toggle="pill"
                    href="#nav-profile"
                  >
                    <h5 className="m-0">{init.initData.tab_2}</h5>
                  </a>
                </li>
                <li>
                  <a
                    id="nav-contact-tab"
                    data-toggle="pill"
                    href="#nav-contact"
                  >
                    <h5 className="m-0">{init.initData.tab_3}</h5>
                  </a>
                </li>
              </ul>
              {/* Tab Content */}
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade" id="nav-profile">
                  <ul className="list-unstyled">
                    {/* Single Tab List */}
                    {history.map((item, idx) => {
                      return (
                        <li
                          key={`tdt_${idx}`}
                          className="single-tab-list d-flex align-items-center"
                        >
                          <p className="m-0">
                            From
                            <strong>
                              {sliceOver(item.from_address, 6)}
                            </strong>{" "}
                            To <strong>{sliceOver(item.to_address, 6)}</strong>{" "}
                            at {item.block_timestamp}
                          </p>
                          <hr />
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="tab-pane fade" id="nav-contact">
                  {/* Single Tab List */}
                  <div className="owner-meta d-flex align-items-center mt-3">
                    <span>Owner</span>
                    <a
                      className="owner d-flex align-items-center ml-2"
                      href="/author"
                    >
                      <img
                        className="avatar-sm rounded-circle"
                        src={defaultProfileImg}
                        alt=""
                      />
                      <h6 className="ml-2">
                        {basicData.owner_of &&
                          sliceOver(basicData.owner_of, 12)}
                      </h6>
                    </a>
                  </div>
                  <p className="mt-2">Created : {createdAt}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            {/* Content */}
            <div className="content mt-5 mt-lg-0">
              <h3 className="m-0">{metadata.name}</h3>
              <p>{metadata.description}</p>
              {/* Owner */}
              <div className="owner d-flex align-items-center">
                <span>Owned By</span>
                <a
                  className="owner-meta d-flex align-items-center ml-3"
                  href="/author"
                >
                  <img
                    className="avatar-sm rounded-circle"
                    src={defaultProfileImg}
                    alt=""
                  />

                  <h6 className="ml-2">
                    {basicData.owner_of && sliceOver(basicData.owner_of, 7)}
                  </h6>
                </a>
              </div>
              {/* Item Info List */}
              <div className="item-info-list mt-4">
                <ul className="list-unstyled">
                  <li className="price d-flex justify-content-between">
                    <span>Current Price {init.initData.price_1}</span>
                    <span>{init.initData.price_2}</span>
                    <span>{init.initData.count}</span>
                  </li>
                  <li>
                    <span>Size </span>
                    <span>{init.initData.size}</span>
                  </li>
                  <li>
                    <span>Volume Traded </span>
                    <span>{init.initData.volume}</span>
                  </li>
                </ul>
              </div>
              <div className="row items">
                {init.sellerData.map((item, idx) => {
                  return (
                    <div
                      key={`sd_${idx}`}
                      className="col-12 col-md-6 item px-lg-2"
                    >
                      <div className="card no-hover">
                        <div className="single-seller d-flex align-items-center">
                          <a href="/author">
                            <img
                              className="avatar-md rounded-circle"
                              src={item.img}
                              alt=""
                            />
                          </a>
                          {/* Seller Info */}
                          <div className="seller-info ml-3">
                            <a className="seller mb-2" href="/author">
                              {item.seller}
                            </a>
                            <span>{item.post}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetails;
