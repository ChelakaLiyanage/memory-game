import { Navigate, Outlet } from "react-router-dom";

import { useAuthenticationContext } from "../../providers/AuthenticationProvider";

import { routeHelper } from "../../helpers/routeHelper";

const AuthenticatedWrapper = () => {
  const { isAuthenticated } = useAuthenticationContext();

  if (!isAuthenticated) {
    return <Navigate to={routeHelper.SIGNIN.PATH} />;
  }
  return <Outlet />;
};

export default AuthenticatedWrapper;
