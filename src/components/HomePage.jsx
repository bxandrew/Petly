import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const HomePage = () => {
  return (
    <>
      <div className="main-bg">
        <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3269&q=80"></img>
      </div>
      <div className="main-container">
        <div className="slogan-container">
          <div className="main-slogan">
            Thinking of finding a new bundle full of joy to your family?
          </div>
          <div className="second-slogan">
            You can begin by clicking the button below and we'll help you find
            the perfect match
          </div>
          <div>
            <Link to="/search" style={{ textDecoration: "none" }}>
              <button>Find A Friend</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
