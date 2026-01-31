import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = ({ loggedIn }) => {
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};
