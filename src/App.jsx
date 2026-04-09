import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./layout/AdminLayout";
import StudentForm from "./components/StudentForm";
import UserForm from "./components/UserForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout wraps pages */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="StudentForm" element={<StudentForm/>}/>
          <Route path="UserForm" element={<UserForm/>}/>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;