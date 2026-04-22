
import {  BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { checkTokenExpiry } from "./utils/auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HRLayout from "./layout/HRLayout";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import UserForm from "./components/UserForm";
import StudentForm from "./components/StudentForm";
import ProtectedRoute from "./pages/ProtectedRoute";
import CompletedTasks from "./pages/CompletedTasks";
import PendingTasks from "./pages/PendingTasks";
import BikePage from "./pages/BikePage";
import SponsorshipPage from "./pages/SponsorshipPage";
import BlogPage from "./pages/BlogPage";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import PaymentPage from "./pages/PaymentPage";
import { Toaster } from "react-hot-toast";
import Transaction from "./pages/Transactions";
import CarList from "./pages/CarList";
import OfferPage from "./pages/OfferPage";
import FinalPage from "./pages/FinalPage";
import LogoUpload from "./components/LogoUpload";


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
     <Toaster position="top-right" />
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
            <Route path="hr" element={<HRDashboard />}/>
            <Route path="/admin/completed" element={<CompletedTasks />} />
            <Route path="/admin/pending" element={<PendingTasks />} />
            <Route path="/admin/bikes" element={<BikePage />} />
            <Route path="/admin/sponcership" element={<SponsorshipPage/>}/>
            <Route path="/admin/blogpage" element={<BlogPage/>}/>
            <Route path="/admin/productlist" element={<ProductList />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/payment" element={<PaymentPage />} />
            <Route path="/admin/transaction" element={<Transaction/>}/>
            <Route path="/admin/carlist" element={<CarList />} />
            <Route path="/admin/offer" element={<OfferPage />} />
            <Route path="/admin/final" element={<FinalPage />} />
             <Route path="/admin/logo-upload" element={<LogoUpload />} />
          
          </Route>
        </Route>

        {/* 🔒 HR */}
       <Route element={<ProtectedRoute role="hr" />}>
       <Route path="/hr" element={<HRLayout />}>
       <Route index element={<HRDashboard />} />
     </Route>
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
