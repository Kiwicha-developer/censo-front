import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const isAuth = !!token;
  const location = useLocation();

  if (!isAuth && location.pathname !== "/") {
    return <Navigate to="/" replace />;
  }

  if (isAuth && location.pathname === "/") {
    return <Navigate to="/usuarios" replace />;
  }

  return children;
};

export default ProtectedRoute;
