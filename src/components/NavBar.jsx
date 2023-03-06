import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";

const NavBar = ({ isLoggedIn, setIsLoggedIn, setSession }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    setSession("");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logo">
            <img src="./logo.png" alt="Dog Icon" />
            <span className="title">Petly</span>
          </div>
        </Link>
        {isLoggedIn === false ? (
          <div className="sign-up">
            <Link to="/login_signup">
              <button>Login / Sign-Up</button>
            </Link>
          </div>
        ) : (
          <div className="sign-up">
            <Link to="/search">
              <button>Search</button>
            </Link>
            <Link to="/mylist">
              <button>My List</button>
            </Link>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
