import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "./homepage.scss";

const HomePage = () => {
  return (
    <>
      <div className="main-bg">
        <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3269&q=80"></img>
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
