import { useState } from "react";
import { Outlet } from "react-router-dom"; // ✅ ADD THIS
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AdminLayout = () => { // ❌ remove children
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:shadow-none
        `}
      >
        <Sidebar closeSidebar={() => setIsOpen(false)} />
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">

        {/* Navbar */}
        <Navbar toggleSidebar={() => setIsOpen(true)} />

        {/* Page Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <Outlet /> {/* 🔥 THIS IS THE FIX */}
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;