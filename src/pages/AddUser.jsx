import { useState } from "react";
import axios from "axios";

function AddUser() {
  const API = "http://localhost:5000/api/users";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    image: null
  });

  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      await axios.post(`${API}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("User added with image ✅");

      setForm({
        name: "",
        email: "",
        password: "",
        image: null
      });

      setPreview(null);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-6 rounded-xl shadow w-96">

        <h2 className="text-xl font-bold mb-4 text-center">
          Upload User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* IMAGE */}
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setForm({ ...form, image: file });

              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            }}
          />

          {/* PREVIEW */}
          {preview && (
            <img
              src={preview}
              className="w-20 h-20 rounded-full object-cover mx-auto"
            />
          )}

         <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded">
                             Upload User
                                    </button>
                   </form>

      </div>

    </div>
  );
}

export default AddUser;