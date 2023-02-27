import React from "react";
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

const LoginPage = () => {
  const handleSubmit = (values) => {
    axios
      .post("http://localhost:8080/api/auth/register", values)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };

  return (
    <div>
      <h1>Login page</h1>
      <div className="form-container">
        <Formik
          initialValues={{
            email: "",
            // firstName: "",
            // lastName: "",
            password: "",
          }}
          validationSchema={Yup.object({
            // firstName: Yup.string()
            //   .max(15, "Must be 15 characters or less")
            //   .required("First Name is required"),
            // lastName: Yup.string()
            //   .max(20, "Must be 20 characters or less")
            //   .required("Last Name is required"),
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
            console.log("Our values are: ", JSON.stringify(values, null, 2));
            handleSubmit(values);
            setSubmitting(false); // To finish off the cycle
          }}
        >
          {(formik) => (
            <Form>
              <MyTextInput label="Email Address" name="email" type="email" />
              {/* <MyTextInput label="First Name" name="firstName" type="text" />
              <MyTextInput label="Last Name" name="lastName" type="text" /> */}
              <MyTextInput label="Password" name="password" type="password" />
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
