import React, { Component, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

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
    const result = {};
    setUploadedFile(file);
    setItem({ ...item, path: result.path });
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
