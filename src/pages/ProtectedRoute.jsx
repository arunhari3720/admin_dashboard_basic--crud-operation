import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) {
    return <Navigate to="/" />;
  }

  // ✅ Admin + Superadmin
  if (role === "admin" && !["admin", "superadmin"].includes(user.role)) {
    return <Navigate to="/" />;
  }

  // ✅ HR + Superadmin
  if (role === "hr" && !["hr", "superadmin"].includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;