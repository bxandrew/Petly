import React from "react";
import { Formik, Form, useField, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./signuppage.scss";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  // Returns .getFieldProps as field and .getFieldMeta as meta
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const SignupPage = () => {
  return (
    <div>
      <h1>Signup page</h1>
      <div className="form-container">
        <Formik
          initialValues={{ email: "", firstName: "", lastName: "" }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("First Name is required"),
            lastName: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Last Name is required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              .required("Password is required")
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
              ),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false); // To finish off the cycle
          }}
        >
          {(formik) => (
            <Form>
              <div>
                <label htmlFor="email">Email Address</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="andrew@andrew.com"
                />
                <ErrorMessage name="email" />
              </div>
              <div>
                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" type="text" placeholder="andrew" />
                <ErrorMessage name="firstName" />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" type="text" placeholder="test" />
                <ErrorMessage name="lastName" />
              </div>

              <MyTextInput label="Password" name="password" type="password" />

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupPage;
