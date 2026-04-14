
import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { checkTokenExpiry } from "./utils/auth";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import UserForm from "./components/UserForm";
import StudentForm from "./components/StudentForm";

import ProtectedRoute from "./pages/ProtectedRoute";

// ✅ NEW
import HRDashboard from "./pages/HRDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  useEffect(() => {
    checkTokenExpiry();
  }, []);

  return (
    <HashRouter>
      <Routes>

        {/* 🔓 PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔒 ADMIN + SUPERADMIN */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>

            {/* Default Dashboard */}
            <Route index element={<Dashboard />} />

            {/* Nested Routes */}
            <Route path="studentform" element={<StudentForm />} />
            <Route path="userform" element={<UserForm />} />

          </Route>
        </Route>

        {/* 🔒 HR */}
        <Route element={<ProtectedRoute role="hr" />}>
          <Route path="/hr" element={<HRDashboard />} />
        </Route>

        {/* 🔒 USER */}
        <Route element={<ProtectedRoute />}>
          <Route path="/user" element={<UserDashboard />} />
        </Route>

      </Routes>
    </HashRouter>
  );
}

export default App;
