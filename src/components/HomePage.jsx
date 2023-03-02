import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "./homepage.scss";

const HomePage = () => {
  return (
    <>
      <div className="main-bg">
        <img src="./mainpagedogs.jpg"></img>
      </div>
      <div className="main-container">
        <div className="slogan-container">
          <div className="main-slogan">
            <div>Adopt a pet</div>
            <div>Make an impact</div>
          </div>
          <div className="second-slogan">
            There are many animals in need that need people like you to help
            rescue them. Let us help find you a match.
          </div>
          <div>
            <Link to="/login_signup" style={{ textDecoration: "none" }}>
              <button className="get-started">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
