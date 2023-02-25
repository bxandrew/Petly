import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

const NavBar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logo">
            <img src="./shiba.png" alt="Dog Icon" />
            <span className="title">Adopt Me</span>
          </div>
        </Link>

        <div>
          <Link to="/search">
            <button>Rescue your purrfect match</button>
          </Link>
        </div>
        <div className="sign-up">
          <Link to="/signup">
            <button>Sign-Up</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
