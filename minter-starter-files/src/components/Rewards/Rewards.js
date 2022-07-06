import React, { useEffect, useState } from "react";
import { gweiToEth, sliceOver } from "../../utils/util";

const initData = {
  preHeading: "Rewards",
  heading: "Staked Pools",
  btnText: "View All",
};

const Rewards = () => {
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
            <div className="intro mb-4">
              <div className="intro-content">
                <span>{initData.preHeading}</span>
                <h3 className="mt-3 mb-0">{initData.heading}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row items">
          <div className="col-12 col-md-6 col-lg-8">
            {/* Netstorm Tab */}
            <ul className="netstorm-tab nav nav-tabs" id="nav-tab">
              <li>
                <a
                  className="active"
                  id="nav-home-tab"
                  data-toggle="pill"
                  href="#nav-home"
                >
                  <h5 className="m-0">{data.tabTitle_1}</h5>
                </a>
              </li>
              <li>
                <a id="nav-profile-tab" data-toggle="pill" href="#nav-profile">
                  <h5 className="m-0">{data.tabTitle_2}</h5>
                </a>
              </li>
              <li>
                <a id="nav-contact-tab" data-toggle="pill" href="#nav-contact">
                  <h5 className="m-0">{data.tabTitle_3}</h5>
                </a>
              </li>
            </ul>
            {/* Tab Content */}
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-home">
                <ul className="list-unstyled">
                  {/* Single Tab List */}
                  {data?.tabData_1?.map((item, idx) => {
                    return (
                      <li
                        key={`ato_${idx}`}
                        className="single-tab-list d-flex align-items-center"
                      >
                        <a href="/item-details">
                          <img className="avatar-lg" src={item.img} alt="" />
                        </a>
                        {/* Activity Content */}
                        <div className="activity-content ml-4">
                          <a href="/item-details">
                            <h5 className="mt-0 mb-2">
                              {sliceOver(item.token_address, 8)}
                            </h5>
                          </a>
                          <p className="m-0">
                            From{" "}
                            <a href="/author">
                              {sliceOver(item.seller_address, 8)}
                            </a>
                          </p>
                          <p className="m-0">
                            to{" "}
                            <a href="/author">
                              {sliceOver(item.buyer_address, 8)}
                            </a>
                          </p>
                          <p className="m-0">
                            Price{" "}
                            <a href="/author">
                              {gweiToEth(parseInt(item.price)).toFixed(3)} ETH
                            </a>
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="tab-pane fade" id="nav-profile">
                <ul className="list-unstyled">
                  {/* Single Tab List */}
                  {data.tabData_2.map((item, idx) => {
                    return (
                      <li
                        key={`att_${idx}`}
                        className="single-tab-list d-flex align-items-center"
                      >
                        <a href="/item-details">
                          <img className="avatar-lg" src={item.img} alt="" />
                        </a>
                        {/* Activity Content */}
                        <div className="activity-content ml-4">
                          <a href="/item-details">
                            <h5 className="mt-0 mb-2">{item.title}</h5>
                          </a>
                          <p className="m-0">
                            Bid listed for <strong>{item.price}</strong>{" "}
                            {item.time} <br />
                            by <a href="/author">{item.seller}</a>
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="tab-pane fade" id="nav-contact">
                <ul className="list-unstyled">
                  {/* Single Tab List */}
                  {data.tabData_3.map((item, idx) => {
                    return (
                      <li
                        key={`atth_${idx}`}
                        className="single-tab-list d-flex align-items-center"
                      >
                        <a href="/item-details">
                          <img className="avatar-lg" src={item.img} alt="" />
                        </a>
                        {/* Activity Content */}
                        <div className="activity-content ml-4">
                          <a href="/item-details">
                            <h5 className="mt-0 mb-2">{item.title}</h5>
                          </a>
                          <p className="m-0">
                            Bid listed for <strong>{item.price}</strong>{" "}
                            {item.time} <br />
                            by <a href="/author">{item.seller}</a>
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            {/* Activity Content */}
            <div className="activity-content mt-5 mt-lg-0">
              {/* Single Widget */}
              <div className="single-widget">
                {/* Search Widget */}
                <div className="widget-content search-widget">
                  <form action="#">
                    <input type="text" placeholder="Enter your keywords" />
                  </form>
                </div>
              </div>
              {/* Single Widget */}
              <div className="single-widget">
                {/* Filter Widget */}
                <div className="widget filter-widget">
                  <h4 className="title">{data.widgetTitle}</h4>
                  {/* Filter Widget Content */}
                  <div className="widget-content">
                    {/* Tags Widget Items */}
                    <div className="widget-content filter-widget-items mt-3">
                      {data.filterData.map((item, idx) => {
                        return (
                          <a key={`fd_${idx}`} href="#" className="badge tag">
                            {item.title}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rewards;
