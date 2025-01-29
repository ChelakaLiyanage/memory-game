import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAuthenticationContext } from "../../providers/AuthenticationProvider";

import { routeHelper } from "../../helpers/routeHelper";

import { getFirebaseErrorMessage } from "../../utils/utils";

import "../../css/style.css";

const SignIn = () => {
  const { signIn } = useAuthenticationContext();

  //...........................Form Validation............................................................

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await signIn(values.email, values.password);
      } catch (error) {
        setErrors({ general: getFirebaseErrorMessage(error.code) });
      } finally {
        setSubmitting(false);
      }
    },
  });

  //.....................................................................

  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit} className="form">
        <h2>Sign In</h2>
        <TextField
          sx={{ m: 1 }}
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          sx={{ m: 1 }}
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          variant="outlined"
          className="button-white"
          type="submit"
          sx={{ m: 1 }}
          disabled={formik.isSubmitting}
        >
          Sign In
        </Button>
        {formik.errors.general && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {formik.errors.general}
          </p>
        )}
        <Link
          to={routeHelper.SIGNUP.PATH}
          style={{ color: "white", fontSize: "16px" }}
        >
          Not Registered Yet? Sign Up
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
