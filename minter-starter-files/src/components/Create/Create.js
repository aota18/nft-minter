import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import React, { Component, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { useIpfs } from "../../hooks/useIpfs";
import { pinJSONToIPFS } from "../../utils/pinata";

const contractAddress_mumbai = "0xfD94703371dbbb562B2EE64C29F2F58e9101b3A9";
const contractAddress_goerli = "0x3F543Dc0c4BA69a1ea7518A76e9537F28B81bCF3";
const ipfsBaseUrl = "ipfs://";

const Create = () => {
  const web3 = createAlchemyWeb3(process.env.REACT_APP_ALCHEMY_KEY);
  const navigate = useNavigate();

  const { ipfs } = useIpfs();

  const fileRef = useRef(null);
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({
    name: "",
    description: "",
    path: "",
  });
  const [uploadedFile, setUploadedFile] = useState(null);

  const onFileUpload = async (e) => {
    // e.preventDefault();

    const files = e.target.files;
    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // TODO : Check file: type, size, mime type
    const result = await ipfs.add(file);

    setUploadedFile(file);
    setItem({ ...item, path: result.path });
  };

  const mintNFT = async () => {
    // TODO: Input Validation

    const name = item.name;
    const description = item.description;
    const imageURI = ipfsBaseUrl + item.path;
    const properties = JSON.stringify({
      trait_type: "Base",
      value: "Starfish",
    });

    const currentTokenId = 1;

    const contractABI = require("../../contracts/artifacts/contracts/Collection.sol/Collection.json");
    const abi = contractABI.abi;
    window.contract = await new web3.eth.Contract(abi, contractAddress_goerli);

    console.log(window.ethereum.selectedAddress);

    const transactionParameters = {
      to: contractAddress_goerli,
      from: window.ethereum.selectedAddress,
      data: window.contract.methods
        .mint(
          window.ethereum.selectedAddress,
          1,
          imageURI,
          name,
          description,
          properties
        )
        .encodeABI(),
    };

    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      console.log("success", txHash);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="author-area">
      <div className="container">
        <div className="row justify-content-between">
          {/* <div className="col-12 col-md-4">
                            
                            <AuthorProfile />
                        </div> */}
          <div className="col-12 col-md-7">
            {/* Intro */}
            <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
              <div className="intro-content">
                <span>Get Started</span>
                <h3 className="mt-3 mb-0">Create NFT</h3>
              </div>
            </div>

            {/* Item Form */}

            <form className="item-form card no-hover">
              <div className="row">
                <div className="col-12">
                  <div className="input-group form-group">
                    <div className="custom-file">
                      <input
                        ref={fileRef}
                        type="file"
                        className="custom-file-input"
                        onChange={onFileUpload}
                        id="inputGroupFile01"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile01"
                      >
                        {uploadedFile ? uploadedFile.name : "Browse"}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={item.value}
                      onChange={(e) =>
                        setItem({ ...item, name: e.target.value })
                      }
                      placeholder="Item Name"
                      required="required"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      name="textarea"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) =>
                        setItem({ ...item, description: e.target.value })
                      }
                      cols={30}
                      rows={3}
                      defaultValue={""}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <button
                    className="btn w-100 mt-3 mt-sm-4"
                    onClick={(e) => {
                      mintNFT();
                      e.preventDefault();
                    }}
                    disabled={loading ? true : false}
                  >
                    {loading ? "Loading..." : "Create Item"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Create;
