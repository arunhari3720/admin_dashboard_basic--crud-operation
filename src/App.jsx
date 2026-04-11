import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./layout/AdminLayout";
import UserForm from "./components/UserForm";
import StudentForm from "./components/StudentForm";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>

        {/* 🔓 Public */}
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/register" element={<Register />} />

        {/* 🔒 Protected */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<AdminLayout />}>

            {/* Default */}
            <Route index element={<Dashboard />} />

            {/* Nested */}
            <Route path="studentform" element={<StudentForm />} />
            <Route path="userform" element={<UserForm />} />

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
