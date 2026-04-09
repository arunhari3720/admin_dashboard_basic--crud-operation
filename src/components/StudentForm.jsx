import { useState, useEffect } from "react";
import axios from "axios";

function StudentForm() {
  const API = "http://localhost:5000/api/students";

  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    subject1: "",
    subject2: "",
    subject3: "",
    subject4: "",
    subject5: ""
  });

  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  // 🔥 FETCH
  const fetchStudents = async () => {
    const res = await axios.get(API);
    setStudents(res.data);
  };

  useEffect(() => {const fetchStudents = async () => {
      try {
        const res = await axios.get(API);
        setStudents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStudents();
  }, []);

  // 🔥 VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!/^[A-Za-z ]+$/.test(form.name)) {
      newErrors.name = "Only letters allowed";
    }

    for (let i = 1; i <= 5; i++) {
      if (!/^\d+$/.test(form[`subject${i}`])) {
        newErrors[`subject${i}`] = "Numbers only";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (editId) {
      await axios.put(`${API}/${editId}`, form);
    } else {
      await axios.post(API, form);
    }

    setForm({
      name: "",
      rollNo: "",
      subject1: "",
      subject2: "",
      subject3: "",
      subject4: "",
      subject5: ""
    });

    setEditId(null);
    setShowModal(false);
    fetchStudents();
  };

  // 🔥 EDIT
  const handleEdit = (student) => {
    setForm(student);
    setEditId(student._id);
    setShowModal(true);
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchStudents();
  };

  return (
    <div className="p-6">

      {/* 🔥 ADD BUTTON */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600"
      >
        Add Student
      </button>

      {/* 🔥 TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3">Name</th>
              <th>Roll</th>
              <th>S1</th>
              <th>S2</th>
              <th>S3</th>
              <th>S4</th>
              <th>S5</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr
                key={s._id}
                className="text-center border-t hover:bg-gray-50"
              >
                <td className="p-2">{s.name}</td>
                <td>{s.rollNo}</td>
                <td>{s.subject1}</td>
                <td>{s.subject2}</td>
                <td>{s.subject3}</td>
                <td>{s.subject4}</td>
                <td>{s.subject5}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleEdit(s)}
                    className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(s._id)}
                    className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">

            <h2 className="text-xl font-semibold mb-4">
              {editId ? "Edit Student" : "Add Student"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">

              {/* NAME */}
             <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-1">
                        Name
                      </label>

                      <input
                        value={form.name}
                        className={`border p-2 rounded focus:ring-2 ${
                          errors.name ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
                        }`}
                        onChange={(e) => {
                          const value = e.target.value;

                          // ❌ block invalid characters
                          if (!/^[A-Za-z ]*$/.test(value)) {
                            setErrors({
                              ...errors,
                              name: "Only letters allowed"
                            });
                            return; // 🔥 stop input
                          }

                          // ✅ valid input
                          setForm({ ...form, name: value });

                          // clear error
                          setErrors({ ...errors, name: "" });
                        }}
                      />

                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
              {/* ROLL */}
               <label className="text-sm font-semibold text-gray-600 mb-1">
                RollNo
              </label>

              <input
                value={form.rollNo}
                placeholder="Roll No"
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setForm({ ...form, rollNo: e.target.value })
                }
              />

              {/* SUBJECTS */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                 <label className="text-sm font-semibold text-gray-600 mb-1">
                Marks
              </label>
                  <input
                    value={form[`subject${i}`]}
                    placeholder={`Subject ${i}`}
                    className="w-full border p-2 rounded"
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) {
                        setForm({
                          ...form,
                          [`subject${i}`]: e.target.value
                        });
                      }
                    }}
                  />
                  {errors[`subject${i}`] && (
                    <p className="text-red-500">
                      {errors[`subject${i}`]}
                    </p>
                  )}
                </div>
              ))}

              {/* BUTTONS */}
              <div className="flex justify-between mt-4">
               <button
                   type="button"
                                onClick={() => {
                                  setShowModal(false);
                                  setEditId(null); // 🔥 reset edit mode

                                  setForm({
                                    name: "",
                                    rollNo: "",
                                    subject1: "",
                                    subject2: "",
                                    subject3: "",
                                    subject4: "",
                                    subject5: ""
                                  }); // 🔥 clear form
                                }}
                              >
                                Cancel
                              </button>

                <button
                  type="submit"
                  className="bg-blue-500 px-4 py-1 rounded text-white"
                >
                  Save
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default StudentForm;