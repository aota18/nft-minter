import React, { useEffect } from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Rewards from "../components/Rewards/Rewards";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

const Reward = () => {
  useEffect(() => {}, []);

  return (
    <div className="main">
      <Header />
      <Breadcrumb title="Rewards" subpage="Pages" page="Rewards" />
      <Rewards />
      <Footer />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default Reward;
