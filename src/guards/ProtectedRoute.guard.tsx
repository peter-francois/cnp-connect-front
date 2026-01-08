import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
