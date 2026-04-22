import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100">

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition lg:hidden ${isCollapsed ? "w-20" : "w-64"}`}
      >
        <Sidebar isCollapsed={isCollapsed} />
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* DESKTOP SIDEBAR */}
      <div className={`hidden lg:flex ${isCollapsed ? "w-20" : "w-64"}`}>
        <Sidebar isCollapsed={isCollapsed} />
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        <Navbar
          toggleSidebar={() => setIsOpen(true)}
          toggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />

        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;