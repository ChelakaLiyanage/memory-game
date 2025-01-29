// import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";

import { useAuthenticationContext } from "../../providers/AuthenticationProvider";

import { routeHelper } from "../../helpers/routeHelper";

import { getFirebaseErrorMessage } from "../../utils/utils";

import "../../css/style.css";

YupPassword(Yup);

const SignUp = () => {
  const { signUp } = useAuthenticationContext();

  //...........................Form Validation............................................................

  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(5, "Username must be at least 5 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .password()
      .required("Password is required")
      .label("Password"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await signUp(values.userName, values.email, values.password);
      } catch (error) {
        setErrors({ general: getFirebaseErrorMessage(error.code) });
      } finally {
        setSubmitting(false);
      }
    },
  });

  //.......................................................................................

  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit} className="form">
        <h2>Sign Up</h2>

        <TextField
          id="userName"
          label="Username"
          variant="outlined"
          type="text"
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          required
          sx={{ mb: 2 }}
        />
        <Button
          variant="outlined"
          type="submit"
          className="button-white"
          disabled={formik.isSubmitting}
        >
          Sign Up
        </Button>
        {formik.errors.general && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {formik.errors.general}
          </p>
        )}
        <Link
          to={routeHelper.SIGNIN.PATH}
          style={{ color: "white", fontSize: "16px" }}
        >
          Already Have an Account? Sign In
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
