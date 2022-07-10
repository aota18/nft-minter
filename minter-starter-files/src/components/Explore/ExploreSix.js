import React, { Component } from "react";
import { Link } from "react-router-dom";
import { defaultImg, defaultProfileImg } from "../../utils/util";

const ipfsPrefix = "https://ipfs.infura.io/ipfs/";

const ExploreSix = ({ collections }) => {
  console.log(collections);
  return (
    <div>
      <div className="container">
        <div className="row items">
          {collections?.map((item, idx) => {
            const meta = JSON.parse(item.metadata);
            let ipfsUrl;
            if (meta) {
              ipfsUrl = meta.image.split("//")[1];
            }

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
                          src={ipfsUrl ? ipfsPrefix + ipfsUrl : defaultImg}
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
                        <h5 className="mb-0">{meta ? meta.name : item.name}</h5>
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
    </div>
  );
};

export default ExploreSix;
