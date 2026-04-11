import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserForm() {
  const API = "http://localhost:5000/api/users";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH USERS
  const fetchUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔥 RESET
  const resetForm = () => {
    setForm({ name: "", email: "", password: "" });
    setErrors({});
    setEditId(null);
  };

  // 🔥 EDIT
  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      password: ""
    });
    setEditId(user._id);
    setShowModal(true);
  };

  // 🔥 VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!/^[A-Za-z ]+$/.test(form.name)) {
      newErrors.name = "Only letters allowed";
    }

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(form.email)) {
      newErrors.email = "Must be @gmail.com";
    }

    if (!editId) {
      if (!/[A-Z]/.test(form.password))
        newErrors.password = "Missing uppercase";
      else if (!/[a-z]/.test(form.password))
        newErrors.password = "Missing lowercase";
      else if (!/[0-9]/.test(form.password))
        newErrors.password = "Missing number";
      else if (!/[!@#$%^&*]/.test(form.password))
        newErrors.password = "Missing special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form);
        toast.success("User updated successfully ✅");
      } else {
        await axios.post(`${API}/register`, form);
        toast.success("User added successfully ✅");
      }

      resetForm();
      setShowModal(false);
      fetchUsers();

    } catch (error) {
      toast.error("Something went wrong ❌");
    }

    setLoading(false);
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    toast.success("User deleted 🗑️");
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* 🔔 TOAST */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* ADD BUTTON */}
      <button
        onClick={() => {
          resetForm();
          setShowModal(true);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Add User
      </button>

      {/* USER LIST */}
      <div className="mt-6 grid gap-4">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-lg">{u.name}</p>
              <p className="text-gray-500">{u.email}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(u)}
                className="bg-yellow-400 px-3 py-1 text-white rounded hover:bg-yellow-500"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(u._id)}
                className="bg-red-500 px-3 py-1 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">

            <h2 className="text-xl font-bold mb-4 text-center">
              {editId ? "Edit User" : "Add User"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* NAME */}
              <div>
                <label className="text-sm font-semibold">Name</label>
                <input
                  value={form.name}
                  className="w-full border p-2 rounded"
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-semibold">Email</label>
                <input
                  value={form.email}
                  className="w-full border p-2 rounded"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-semibold">Password</label>
                <input
                  type="password"
                  value={form.password}
                  className="w-full border p-2 rounded"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                {errors.password && <p className="text-red-500">{errors.password}</p>}
              </div>

              {/* BUTTONS */}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="bg-gray-400 px-4 py-1 text-white rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 px-4 py-1 text-white rounded flex items-center justify-center"
                >
                  {loading ? (
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* FULL SCREEN LOADER */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

    </div>
  );
}

export default UserForm;