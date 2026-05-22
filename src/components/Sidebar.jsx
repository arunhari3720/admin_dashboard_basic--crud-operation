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
import { useEffect, useState, useRef } from "react";
import axios from "axios";

// 🔥 TOOLTIP COMPONENT — uses fixed positioning to escape overflow
const TooltipItem = ({ icon, name, isCollapsed, children }) => {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0 });
  const ref = useRef(null);

  const handleMouseEnter = () => {
    if (!isCollapsed) return;
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setPos({ top: rect.top + rect.height / 2 });
    }
    setShow(true);
  };

  const handleMouseLeave = () => setShow(false);

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full"
    >
      {children}

      {/* 🔥 FIXED TOOLTIP — escapes overflow */}
      {isCollapsed && show && (
        <div
          style={{ top: pos.top, left: "72px", transform: "translateY(-50%)" }}
          className="fixed z-[9999] bg-gray-900 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap pointer-events-none shadow-lg"
        >
          {name}
          {/* Arrow */}
          <span
            className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"
          />
        </div>
      )}
    </div>
  );
};

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
          <TooltipItem key={index} name={item.name} isCollapsed={isCollapsed}>
            <NavLink
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
              {item.icon}
              {!isCollapsed && <span>{item.name}</span>}
            </NavLink>
          </TooltipItem>
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