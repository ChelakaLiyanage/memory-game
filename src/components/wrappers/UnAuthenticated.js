import { Navigate, Outlet } from "react-router-dom";

import { useAuthenticationContext } from "../../providers/AuthenticationProvider";

import { routeHelper } from "../../helpers/routeHelper";

const UnAuthenticatedWrapper = () => {
  const { isAuthenticated } = useAuthenticationContext();

  if (isAuthenticated) {
    return <Navigate to={routeHelper.MAINPAGE.PATH} />;
  }
  return <Outlet />;
};

export default UnAuthenticatedWrapper;
