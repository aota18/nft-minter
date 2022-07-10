import React, { useEffect } from "react";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

// importing all the themes
import ThemeOne from "../themes/theme-one";
import ExploreOne from "../themes/explore-one";
import ItemDetails from "../themes/item-details";
import Rewards from "../themes/activity";
import Author from "../themes/author";
import Create from "../themes/create";
import ExploreTwo from "../components/Explore/ExploreTwo";
const MyRouts = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<ThemeOne />} />
          <Route exact path="/explore-1" element={<ExploreOne />} />
          <Route exact path="/item-details/:id" element={<ItemDetails />} />
          <Route exact path="/collections" element={<ExploreTwo />} />
          <Route exact path="/rewards" element={<Rewards />} />
          <Route exact path="/author" element={<Author />} />
          <Route exact path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default MyRouts;
