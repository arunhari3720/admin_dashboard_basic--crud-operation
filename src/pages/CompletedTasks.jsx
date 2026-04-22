// src/pages/CompletedTasks.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { RotateCcw, Trash2 } from "lucide-react"; // ✅ updated icons

function CompletedTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/task", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🎯 PRIORITY COLORS
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-600";
      case "Medium":
        return "bg-yellow-100 text-yellow-600";
      case "Low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // 🔥 REOPEN TASK
  const handleReopen = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/task/${id}`,
        { status: "Pending" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // remove from completed list instantly
      setTasks(tasks.map(t => t._id === id ? res.data : t));
    } catch (err) {
      console.log(err);
    }
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/task/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const completedTasks = tasks.filter(
    (t) => t.status === "Completed"
  );

  return (
    <div className="bg-gray-200 min-h-screen p-6">

      <h1 className="text-2xl font-bold mb-6">Completed Tasks</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {completedTasks.map((task) => (
          <div
            key={task._id}
            className="bg-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >

            {/* STATUS + PRIORITY */}
            <div className="flex gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600">
                Completed
              </span>

              <span
                className={`text-xs px-3 py-1 rounded-full ${getPriorityColor(task.priority)}`}
              >
                {task.priority}
              </span>
            </div>

            {/* TITLE */}
            <h2 className="text-lg font-semibold mt-4">
              {task.title}
            </h2>

            {/* DESC */}
            <p className="text-sm text-gray-500 mt-2">
              {task.desc}
            </p>

            {/* FOOTER */}
            <div className="flex justify-between items-center mt-6">
              <span className="text-xs bg-gray-200 px-3 py-1 rounded">
                Due: {task.due?.split("T")[0]}
              </span>

              {/* 🔥 ACTIONS */}
              <div className="flex gap-3">

                {/* 🔄 REOPEN */}
                <RotateCcw
                  size={20}
                  className="text-blue-500 cursor-pointer hover:scale-110 transition"
                  onClick={() => handleReopen(task._id)}
                />

                {/* ❌ DELETE */}
                <Trash2
                  size={20}
                  className="text-red-500 cursor-pointer hover:scale-110 transition"
                  onClick={() => handleDelete(task._id)}
                />

              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default CompletedTasks;