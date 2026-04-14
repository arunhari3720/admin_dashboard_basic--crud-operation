import { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

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
    <form onSubmit={handleSubmit}>
      <input placeholder="Name"
        onChange={(e) => setForm({...form, name: e.target.value})} />

      <input placeholder="Email"
        onChange={(e) => setForm({...form, email: e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={(e) => setForm({...form, password: e.target.value})} />

      <select
        onChange={(e) => setForm({...form, role: e.target.value})}>
        <option value="user">User</option>
        <option value="hr">HR</option>
        <option value="teamleader">Team Leader</option>
      </select>

      <button>Create User</button>
    </form>
  );
}

export default CreateUser;