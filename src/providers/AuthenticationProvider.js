import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

import { routeHelper } from "../helpers/routeHelper";

export const AuthenticationContext = createContext();

const AuthenticationProvider = (props) => {
  const navigate = useNavigate();
  const { children } = props;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const completeSignIn = useCallback(
    (userName, email, token) => {
      setIsAuthenticated(true);
      localStorage.setItem("userName", userName);
      localStorage.setItem("email", email);
      localStorage.setItem("token", token);
      navigate(routeHelper.MAINPAGE.PATH);
    },
    [navigate]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      // navigate(routeHelper.MAINPAGE.PATH);
    } else {
      setIsAuthenticated(false);
      navigate(routeHelper.SIGNIN.PATH);
    }
  }, [navigate]);

  const values = useMemo(
    () => ({ isAuthenticated, completeSignIn }),
    [isAuthenticated, completeSignIn]
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
