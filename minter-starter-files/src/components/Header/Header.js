import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const Header = () => {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
  };

  return (
    <header id="header">
      {/* Navbar */}
      <nav
        data-aos="zoom-out"
        data-aos-delay={800}
        className="navbar navbar-expand"
      >
        <div className="container header">
          {/* Navbar Brand*/}
          <a className="navbar-brand" href="/">
            <img
              className="navbar-brand-sticky"
              src="/img/logo.png"
              alt="sticky brand-logo"
            />
          </a>
          <div className="ml-auto" />
          {/* Navbar */}
          <ul className="navbar-nav items mx-auto">
            <li className="nav-item dropdown">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" href="/explore-1">
                Explore
              </a>
            </li>
            <li className="nav-item dropdown">
              <a href="/rewards" className="nav-link">
                Rewards
              </a>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link" href="/create">
                Create
              </a>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link" href="/author">
                My NFT
              </a>
            </li>
          </ul>
          {/* Navbar Icons */}
          <ul className="navbar-nav icons">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                data-toggle="modal"
                data-target="#search"
              >
                <i className="fas fa-search" />
              </a>
            </li>
          </ul>
          {/* Navbar Toggler */}
          <ul className="navbar-nav toggle">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                data-toggle="modal"
                data-target="#menu"
              >
                <i className="fas fa-bars toggle-icon m-0" />
              </a>
            </li>
          </ul>
          {/* Navbar Action Button */}
          <div>{user && user.name}</div>
          <ul className="navbar-nav action">
            <li className="nav-item ml-3">
              <a
                href="#"
                onClick={() => {
                  if (!isAuthenticated) {
                    login();
                  } else {
                    logout();
                  }
                }}
                className="nav-link"
              >
                {!isAuthenticated ? "Wallet Connect" : "Logout"}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
