import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useAuthenticationContext } from "../../providers/AuthenticationProvider";

import { routeHelper } from "../../helpers/routeHelper";

const SignIn = () => {
  const { signIn } = useAuthenticationContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    await signIn(email, password, setError);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSignIn} style={styles.form}>
        <h2>Sign In</h2>
        <TextField
          sx={{ m: 1 }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          sx={{ m: 1 }}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          variant="outlined"
          className="button-white"
          type="submit"
          sx={{ m: 1 }}
        >
          Sign In
        </Button>
        {error && <p style={styles.error}>{error}</p>}
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

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: { display: "flex", flexDirection: "column", width: "300px" },
  input: { marginBottom: "10px", padding: "10px", fontSize: "16px" },
  button: {
    padding: "10px",
    backgroundColor: "#6200ea",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  error: { color: "red", fontSize: "14px" },
};

export default SignIn;
