import { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Clock,
  CheckCircle2,
  Search,
  RotateCcw,
  Trash2,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function HRDashboard() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    desc: "",
    priority: "Medium",
    due: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/task", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setTasks(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/task",
      form,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setTasks([...tasks, res.data]);
    setShowModal(false);

    setForm({
      title: "",
      desc: "",
      priority: "Medium",
      due: "",
    });
  };

  const handleComplete = async (id) => {
    const res = await axios.put(
      `http://localhost:5000/api/task/${id}`,
      { status: "Completed" },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
  };

  const handlePending = async (id) => {
    const res = await axios.put(
      `http://localhost:5000/api/task/${id}`,
      { status: "Pending" },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
  };

  const handleReopen = async (id) => {
    const res = await axios.put(
      `http://localhost:5000/api/task/${id}`,
      { status: "Pending" },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/task/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const filteredTasks = tasks
    .filter((t) => {
      if (filter === "completed") return t.status === "Completed";
      if (filter === "pending") return t.status === "Pending";
      return true;
    })
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.filter(t => t.status === "Pending").length;

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Task Report", 14, 15);

    const rows = tasks.map((task) => [
      task.title,
      task.desc,
      task.due?.split("T")[0],
      task.status,
      task.priority,
    ]);

    autoTable(doc, {
      head: [["Title", "Description", "Due", "Status", "Priority"]],
      body: rows,
    });

    doc.save("tasks.pdf");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Daily Tasks</h1>
          <p className="text-gray-500 text-sm">
            Manage and track your everyday activities
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2"
          >
            <Plus size={18} /> Add Task
          </button>

          <button
            onClick={exportToPDF}
            className="bg-green-600 text-white px-5 py-2 rounded-xl"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Total Tasks</p>
          <h2 className="text-xl font-bold">{total}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-green-600">Completed</p>
          <h2 className="text-xl font-bold">{completed}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-yellow-600">Pending</p>
          <h2 className="text-xl font-bold">{pending}</h2>
        </div>
      </div>

      {/* FILTER + SEARCH */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-3">
          {["all", "completed", "pending"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 border px-3 py-2 rounded">
          <Search size={16} />
          <input
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none bg-transparent"
          />
        </div>
      </div>

      {/* TASK CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >

            {/* STATUS */}
            <span
              className={`text-xs px-3 py-1 rounded-full w-fit ${
                task.status === "Completed"
                  ? "bg-green-100 text-green-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {task.status === "Completed" ? "Completed" : "In Progress"}
            </span>

            <h2 className="text-lg font-semibold mt-4 text-gray-800">
              {task.title}
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              {task.desc}
            </p>

            <div className="border-t my-4"></div>

            <div className="flex justify-between items-center">

              <span className="text-xs bg-gray-100 px-3 py-1 rounded">
                Due: {task.due?.split("T")[0]}
              </span>

              <div className="flex gap-3">

                {task.status !== "Completed" && (
                  <CheckCircle2
                    size={20}
                    className="text-green-500 cursor-pointer hover:scale-110"
                    onClick={() => handleComplete(task._id)}
                  />
                )}

                <Clock
                  size={20}
                  className="text-yellow-500 cursor-pointer hover:scale-110"
                  onClick={() => handlePending(task._id)}
                />

             
                <Trash2
                  size={20}
                  className="text-red-500 cursor-pointer hover:scale-110"
                  onClick={() => handleDelete(task._id)}
                />

              </div>
            </div>

          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="bg-white w-full max-w-xl p-6 rounded-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Create Task</h2>

            <div className="space-y-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border p-2 rounded"
              />

              <textarea
                name="desc"
                value={form.desc}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border p-2 rounded"
              />

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <input
                type="date"
                name="due"
                value={form.due}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <button
                onClick={handleCreateTask}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default HRDashboard;