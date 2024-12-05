import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { routeHelper } from "../helpers/routeHelper";

import { auth } from "../utils/firebase";

export const AuthenticationContext = createContext();

const AuthenticationProvider = (props) => {
  const navigate = useNavigate();
  const { children } = props;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const completeSignIn = useCallback(
    (userName, email, token, userID) => {
      setIsAuthenticated(true);
      localStorage.setItem("userName", userName);
      localStorage.setItem("email", email);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userID);
      navigate(routeHelper.MAINPAGE.PATH);
    },
    [navigate]
  );

  const completeLogOut = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate(routeHelper.SIGNIN.PATH);
  }, [navigate]);

  const signIn = useCallback(
    async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        alert(`User logged in: ${user.displayName}`);
        completeSignIn(
          user.displayName,
          user.email,
          user.accessToken,
          user.uid
        );
      } catch (error) {
        throw error;
      }
    },
    [completeSignIn]
  );

  const signUp = useCallback(
    async (userName, email, password) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await updateProfile(user, { displayName: userName });

        alert(`User created: ${user.displayName}`);
        navigate(routeHelper.SIGNIN.PATH);
      } catch (error) {
        throw error;
      }
    },
    [navigate]
  );

  const logOut = useCallback(async () => {
    signOut(auth)
      .then(() => {
        alert("User logged out succesfully");
        completeLogOut();
      })
      .catch((error) => console.log(error));
  }, [completeLogOut]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const values = useMemo(
    () => ({ isAuthenticated, signIn, signUp, logOut }),
    [isAuthenticated, signIn, signUp, logOut]
  );

  return (
    <AuthenticationContext.Provider value={values}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => {
  return useContext(AuthenticationContext);
};

export default AuthenticationProvider;
