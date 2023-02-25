import React from "react";
import "./signuppage.scss";

const SignupPage = () => {
  return (
    <div>
      <h1>Signup page</h1>

      <div className="form-container">
        <form className="sign-up-form">
          <label>
            <div>Username:</div>
            <input type="text" />
          </label>
          <label>
            <div>Password:</div>
            <input type="text" />
          </label>
          <label>
            <div>Repeat Password:</div>
            <input type="text" />
          </label>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
