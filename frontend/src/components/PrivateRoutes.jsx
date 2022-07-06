import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hook/useAuthStatus";
import Spinner from "./Spinner";

function PrivateRoutes() {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }
  return loggedIn ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRoutes;
