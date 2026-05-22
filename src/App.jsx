import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

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

import Transaction from "./pages/Transactions";

import CarList from "./pages/CarList";

import OfferPage from "./pages/OfferPage";

import FinalPage from "./pages/FinalPage";

import LogoUpload from "./components/LogoUpload";

import HRDashboard from "./pages/HRDashboard";

import UserDashboard from "./pages/UserDashboard";

import { Toaster } from "react-hot-toast";

function App() {

  useEffect(() => {

    checkTokenExpiry();

  }, []);

  return (

    <HashRouter>

      <Toaster position="top-right" />

      <Routes>

        {/* PUBLIC */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ADMIN */}

        <Route
          element={
            <ProtectedRoute role="admin" />
          }
        >

          <Route
            path="/admin"
            element={<AdminLayout />}
          >

            <Route
              index
              element={<Dashboard />}
            />

            <Route
              path="studentform"
              element={<StudentForm />}
            />

            <Route
              path="userform"
              element={<UserForm />}
            />

            <Route
              path="hr"
              element={<HRDashboard />}
            />

            <Route
              path="completed"
              element={<CompletedTasks />}
            />

            <Route
              path="pending"
              element={<PendingTasks />}
            />

            <Route
              path="bikes"
              element={<BikePage />}
            />

            <Route
              path="sponcership"
              element={<SponsorshipPage />}
            />

            <Route
              path="blogpage"
              element={<BlogPage />}
            />

            <Route
              path="productlist"
              element={<ProductList />}
            />

            <Route
              path="add-product"
              element={<AddProduct />}
            />

            <Route
              path="payment"
              element={<PaymentPage />}
            />

            <Route
              path="transaction"
              element={<Transaction />}
            />

            <Route
              path="carlist"
              element={<CarList />}
            />

            <Route
              path="offer"
              element={<OfferPage />}
            />

            <Route
              path="final"
              element={<FinalPage />}
            />

            <Route
              path="logo-upload"
              element={<LogoUpload />}
            />

          </Route>

        </Route>

        {/* HR */}

        <Route
          element={
            <ProtectedRoute role="hr" />
          }
        >

          <Route
            path="/hr"
            element={<HRLayout />}
          >

            <Route
              index
              element={<HRDashboard />}
            />

          </Route>

        </Route>

        {/* USER */}

        <Route
          element={<ProtectedRoute />}
        >

          <Route
            path="/user"
            element={<UserDashboard />}
          />

        </Route>

      </Routes>

    </HashRouter>
  );
}

export default App;