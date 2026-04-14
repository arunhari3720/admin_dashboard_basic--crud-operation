import { useState } from "react";
import axios from "axios";

function UserForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  // 🔥 Get logged-in user safely
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/admin/create-user",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("User Created ✅");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create User 👤
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* 🔥 ROLE DROPDOWN (UPDATED LOGIC) */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Role
            </label>

            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {/* Superadmin can create admin */}
              {currentUser.role === "superadmin" && (
                <option value="admin">Admin</option>
              )}

              {/* Admin & Superadmin can create HR */}
              {(currentUser.role === "superadmin" ||
                currentUser.role === "admin") && (
                <option value="hr">HR</option>
              )}

              {/* Everyone allowed to create user (based on backend rules) */}
              <option value="user">User</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold shadow-md"
          >
            Create User
          </button>

        </form>
      </div>
    </div>
  );
}

export default UserForm;