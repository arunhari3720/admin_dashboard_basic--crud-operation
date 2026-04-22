import { Outlet } from "react-router-dom";

function HRLayout() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔷 Simple Header (HR Panel) */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-bold text-purple-600">
          HR Panel
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
          className="text-red-500 hover:text-red-600"
        >
          Logout
        </button>
      </div>

      {/* 🔷 Page Content */}
      <div className="p-6">
        <Outlet /> {/* ✅ ONLY HERE */}
      </div>

    </div>
  );
}

export default HRLayout;