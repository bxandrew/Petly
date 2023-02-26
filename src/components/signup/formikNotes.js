// {...formik.getFieldProps("firstName")}
// spreading formik .getFieldProps and passing in the name of the input
// Lets us combine 4 things in one line
// name="firstName"
// onChange={formik.handleChange} // Change handler for each input
// onBlur={formik.handleBlur}
// value={formik.values.firstName} // Formik's current values

// <Form></Form>
// Replaces <form>

// <Field>
// Replaces <input>

// <ErrorMessage name={}/>
// Replaces
// {formik.touched.firstName && formik.errors.firstName ? (
// <div>{formik.errors.firstName}</div>
// ) : null}

// Validate function will be executed on every value update
// Yup library does this validation for us.
// const validate = (values) => {
//   const errors = {};
//   if (!values.firstName) {
//     errors.firstName = "Required";
//   } else if (values.firstName.length > 15) {
//     errors.firstName = "Must be 15 characters or less";
//   }

//   if (!values.lastName) {
//     errors.lastName = "Required";
//   } else if (values.lastName.length > 20) {
//     errors.lastName = "Must be 20 characters or less";
//   }

//   if (!values.email) {
//     errors.email = "Required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = "Invalid email address";
//   }

//   return errors;
// };

// The validationSchema from Yup accomplishes the same thing as above except in a much more precise manner
// Yup is a validation library that assists us in doing validation

// Looks like:

// validationSchema: Yup.object({
//   firstName: Yup.string()
//     .max(15, "Must be 15 characters or less")
//     .required("First Name is required"),
//   lastName: Yup.string()
//     .max(20, "Must be 20 characters or less")
//     .required("Last Name is required"),
//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
// }),

// Formik uses a react context provider to use custom hooks
// instead of doing const formik = useFormik({props})

//<Formik
// initialValues={email: '', firstName: '', lastName: ''}
// validationSchema={Yup.object({
//       firstName: Yup.string()
//         .max(15, "Must be 15 characters or less")
//         .required("First Name is required"),
//       lastName: Yup.string()
//         .max(20, "Must be 20 characters or less")
//         .required("Last Name is required"),
//       email: Yup.string()
//         .email("Invalid email address")
//         .required("Email is required"),
//     })}
//     onSubmit={values => console.log(JSON.stringify(values, null,))}
// >
// </Formik>
