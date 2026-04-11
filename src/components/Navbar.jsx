import { Search, Bell, Moon, Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate(); // ✅ must be inside component

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/"); // redirect to login
  };

  return (
    <div className="w-full bg-white shadow px-4 sm:px-6 py-3 flex items-center justify-between">

      {/* Left Section */}
      <div className="flex items-center gap-3">

        <button onClick={toggleSidebar} className="lg:hidden">
          <Menu size={22} />
        </button>

        <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
          <Search size={18} />
          <input
            className="bg-transparent outline-none text-sm w-[120px] md:w-[180px]"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-4">

        <Moon size={20} className="cursor-pointer" />
        <Bell size={20} className="cursor-pointer" />

        {/* 🔥 Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm font-medium"
        >
          <LogOut size={18} />
          <span className="hidden sm:block">Logout</span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            alt="profile"
          />

          <span className="hidden sm:block text-sm font-medium">
            Admin
          </span>
        </div>

      </div>
    </div>
  );
};

export default Navbar;