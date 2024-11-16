import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuthenticationContext } from "../../providers/AuthenticationProvider";

import { routeHelper } from "../../helpers/routeHelper";

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
    <div style={styles.container}>
      <form onSubmit={handleSignUp} style={styles.form}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Sign Up
        </button>
        {error && <p style={styles.error}>{error}</p>}
        <Link to={routeHelper.SIGNIN.PATH} style={{ color: "white" }}>
          Already Have an Account? Sign In
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

export default SignUp;
