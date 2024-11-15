import { useAuthenticationContext } from "../../providers/AuthenticationProvider";

const UnAuthenticatedWrapper = (props) => {
  const { children } = props;
  const { isAuthenticated } = useAuthenticationContext();

  if (!isAuthenticated) {
    return children;
  }
  return null;
};

export default UnAuthenticatedWrapper;
