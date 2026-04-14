import { useEffect, useState } from "react";
import axios from "axios";
import CreateUser from "../components/CreateUser";
import { useNavigate } from "react-router-dom";

function HRDashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("token"); // remove JWT
  navigate("/login"); // redirect to login page
} ;

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.log("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
{/* Left: Title */}
  <div className="flex items-center gap-3">
    <span className="text-2xl">🧑‍💼</span>
    <h1 className="text-2xl font-semibold text-gray-800">
      HR Dashboard
    </h1>
  </div>

  {/* Right: Logout */}
  <button
    onClick={handleLogout}
    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
  >
    🔓 Logout
  </button>


      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: Create User */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Create Employee</h2>
          <CreateUser onUserCreated={fetchUsers} />
        </div>

        {/* RIGHT: Users List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">All Employees</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="border rounded-xl p-4 hover:shadow-lg transition bg-gray-50"
              >
                <h3 className="text-lg font-bold text-gray-800">
                  {user.name}
                </h3>

                <p className="text-sm text-gray-600">
                  📧 {user.email}
                </p>

                {/* Role Badge */}
                <span
                  className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded
                    ${
                      user.role === "superadmin"
                      ? "bg-blue-100 text-blue-600"
                      :user.role === "admin"
                        ? "bg-red-100 text-red-600"
                        : user.role === "hr"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                        
                    }`}
                >
                  {user.role}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default HRDashboard;