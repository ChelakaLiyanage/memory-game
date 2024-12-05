import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useAuthenticationContext } from "../../providers/AuthenticationProvider";

import { routeHelper } from "../../helpers/routeHelper";

import "../../css/style.css";

const SignUp = () => {
  const { signUp } = useAuthenticationContext();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    await signUp(userName, email, password, setError);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSignUp} className="form">
        <h2>Sign Up</h2>

        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Button variant="outlined" type="submit" className="button-white">
          Sign Up
        </Button>
        {error && <p style={styles.error}>{error}</p>}
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

const styles = {
  error: { color: "red", fontSize: "14px" },
};

export default SignUp;
