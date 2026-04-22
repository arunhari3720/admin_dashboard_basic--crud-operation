import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  GraduationCap,
  LogOut,
  CheckCircle2,
  Clock,
  Receipt,
  Handshake,
  Package,
  PlusSquare
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = ({ isCollapsed }) => {
  const [logo, setLogo] = useState("");

  const fetchLogo = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/logo/get");
      setLogo(res.data.logo);
    } catch (err) {
      console.error("Logo fetch error:", err);
    }
  };

  useEffect(() => {
    fetchLogo();
    const handleLogoUpdate = () => fetchLogo();
    window.addEventListener("logoUpdated", handleLogoUpdate);
    return () =>
      window.removeEventListener("logoUpdated", handleLogoUpdate);
  }, []);

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { name: "User Form", path: "/admin/userform", icon: <User size={18} /> },
    { name: "Student Form", path: "/admin/studentform", icon: <GraduationCap size={18} /> },
    { name: "Completed Tasks", path: "/admin/completed", icon: <CheckCircle2 size={18} /> },
    { name: "Pending Tasks", path: "/admin/pending", icon: <Clock size={18} /> },
    { name: "Transactions", path: "/admin/transaction", icon: <Receipt size={18} /> },
    { name: "Sponsors", path: "/admin/sponcership", icon: <Handshake size={18} /> },
    { name: "Products", path: "/admin/productlist", icon: <Package size={18} /> },
    { name: "Add Product", path: "/admin/add-product", icon: <PlusSquare size={18} /> },
    { name: "Cars", path: "/admin/carlist", icon: <Package size={18} /> },
    { name: "Offers", path: "/admin/offer", icon: <Handshake size={18} /> },
    { name: "Final Price", path: "/admin/final", icon: <Receipt size={18} /> },
    { name: "Upload Logo", path: "/admin/logo-upload", icon: <Receipt size={18} /> },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-white border-r h-screen flex flex-col transition-all duration-300`}
    >
      {/* 🔥 HEADER */}
      <div className="p-4 border-b">

        {/* Logo */}
        <div
          className={`rounded-xl bg-gray-50 flex items-center justify-center ${
            isCollapsed ? "h-12 w-12 mx-auto" : "h-20 w-full p-2"
          }`}
        >
          {logo ? (
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-lg" />
          )}
        </div>

        {/* Title */}
        {!isCollapsed && (
          <h2 className="text-center text-base font-semibold text-gray-800 mt-3">
            Admin Panel
          </h2>
        )}
      </div>

      {/* 🔥 MENU */}
      <ul className="flex-1 space-y-2 px-2 overflow-y-auto overflow-x-visible scrollbar-none">
        {!isCollapsed && (
          <p className="text-xs text-gray-400 px-4 mt-4 mb-2 tracking-wide">
            MENU
          </p>
        )}

        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center ${
                isCollapsed ? "justify-center" : "gap-3"
              } w-full h-12 rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`
            }
          >
            {/* ICON + TOOLTIP WRAPPER */}
            <div className="group relative">
              {item.icon}

              {/* 🔥 TOOLTIP (ONLY COLLAPSED) */}
              {isCollapsed && (
  <span className="pointer-events-none absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-[9999]">
    {item.name}
  </span>
)}
              
            </div>

            {/* TEXT */}
            {!isCollapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </ul>

      {/* 🔥 LOGOUT */}
      <div className="p-2 border-t">
        <NavLink
          to="/"
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "gap-3"
          } px-4 py-3 rounded-xl text-red-500 hover:bg-red-100 transition`}
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Logout</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;