import { useContext } from "react";
import { authContext } from "../contexts/auth.context";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { user } = useContext(authContext);

  return user.login ? <Outlet /> : <Navigate to="/" />;
};
