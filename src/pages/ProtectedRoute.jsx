import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // 🔒 Block access if no token
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // ✅ Allow nested routes
  return <Outlet />;
};

export default ProtectedRoute;