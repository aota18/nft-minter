import React, { Component, useState } from "react";
import axios from "axios";

const initData = {
  pre_heading: "Exclusive Assets",
  heading: "Explore",
  btnText: "View All",
};

const ExploreTwo = () => {
  const [data, setData] = useState([]);

  return (
    <section className="explore-area">
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
                <a className="btn content-btn" href="/explore-1">
                  {initData.btnText}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row items">
          {data.map((item, idx) => {
            return (
              <div key={`edt_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                <div className="card">
                  <div className="image-over">
                    <a href="/item-details">
                      <img className="card-img-top" src={item.img} alt="" />
                    </a>
                  </div>
                  {/* Card Caption */}
                  <div className="card-caption col-12 p-0">
                    {/* Card Body */}
                    <div className="card-body">
                      <a href="/item-details">
                        <h5 className="mb-0">{item.title}</h5>
                      </a>
                      <div className="seller d-flex align-items-center my-3">
                        <span>Owned By</span>
                        <a href="/author">
                          <h6 className="ml-2 mb-0">{item.owner}</h6>
                        </a>
                      </div>
                      <div className="card-bottom d-flex justify-content-between">
                        <span>{item.price}</span>
                        <span>{item.count}</span>
                      </div>
                      <a
                        className="btn btn-bordered-white btn-smaller mt-3"
                        href="/wallet-connect"
                      >
                        <i className="icon-handbag mr-2" />
                        {item.btnText}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreTwo;
