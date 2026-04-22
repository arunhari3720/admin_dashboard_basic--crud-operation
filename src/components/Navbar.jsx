import { Search, Bell, Moon, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { socket } from "../socket/socket";

const Navbar = ({ toggleSidebar, toggleCollapse }) => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    socket.on("new-payment", (data) => {
      setNotifications((prev) => [
        { ...data, read: false },
        ...prev,
      ]);
    });

    return () => socket.off("new-payment");
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="w-full bg-white border-b px-6 py-3 flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* Mobile Sidebar */}
        <button onClick={toggleSidebar} className="lg:hidden">
          <Menu size={22} />
        </button>

        {/* 🔥 Desktop Collapse (NEW) */}
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex items-center justify-center w-10 h-10 border rounded-lg hover:bg-gray-100 transition"
        >
          <Menu size={18} />
        </button>

        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg w-64">
          <Search size={18} />
          <input
            className="bg-transparent outline-none text-sm w-full"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6 relative">

        <Moon className="cursor-pointer" />

        <div onClick={() => setOpen(!open)} className="relative cursor-pointer">
          <Bell />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>

        {open && (
          <div className="absolute right-0 top-14 w-80 bg-white shadow-xl border rounded-xl z-50">
            <p className="p-4 text-sm text-gray-500 text-center">
              Notifications
            </p>
          </div>
        )}

        {user && (
          <div className="flex items-center gap-3">
            <img
              src={`https://i.pravatar.cc/40?u=${user.email}`}
              className="w-9 h-9 rounded-full border"
              alt="profile"
            />
            <div className="hidden sm:flex flex-col text-sm">
              <span>{user.name}</span>
              <span className="text-xs text-gray-500">{user.role}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;