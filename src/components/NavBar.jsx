import React from "react";

const NavBar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="logo">
          <img src="./shiba.png" alt="Dog Icon" />
          <span className="self-center text-xl">Adopt Me</span>
        </div>
        <div>
          <button>Rescue your purrfect match</button>
        </div>
        <div className="sign-up">
          <button>Sign-Up</button>
          <button>Login</button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
