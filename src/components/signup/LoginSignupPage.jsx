import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, useField, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./signuppage.scss";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  // Returns .getFieldProps as field and .getFieldMeta as meta
  return (
    <div className="text-input-container">
      <label htmlFor={props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const LoginSignupPage = ({ setIsLoggedIn, setSession, session }) => {
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate(); // Custom hook from react-router-dom
  const handleSubmit = (values) => {
    axios
      .post("http://localhost:8080/auth/login_signup", values)
      .then((res) => {
        // console.log(res.data.success);
        setSession(res.data.success);
        setIsLoggedIn(true);
        setShowError(false);
        navigate("/search"); //navigates you back to home page
        // Todo: check to see if list has items, if it does go to list
        // Successful login should take you to either search or my list
      })
      .catch(() => {
        setShowError(true);
        console.log("Error logging in");
      });
  };

  return (
    <div>
      <h1>Login or Signup page</h1>
      <div className="form-container">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              // .matches(
              //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
              // )
              .required("Password is required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            // console.log("Our values are: ", JSON.stringify(values, null, 2));
            handleSubmit(values);
            setSubmitting(false); // To finish off the cycle
          }}
        >
          {(formik) => (
            <Form>
              <MyTextInput label="Email Address" name="email" type="email" />
              <MyTextInput label="Password" name="password" type="password" />
              <button type="submit">Submit</button>
              {showError ? (
                <div className="error-message">
                  Incorrect Username/Password or User Already Exists
                </div>
              ) : null}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginSignupPage;
