// src/pages/PendingTasks.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle2, Clock } from "lucide-react";

function PendingTasks() {
  const [tasks, setTasks] = useState([]);

  // ✅ FETCH TASKS
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

  // ✅ PRIORITY COLOR
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

  // ✅ FILTER PENDING
  const pendingTasks = tasks.filter(
    (t) => t.status !== "Completed"
  );

  // ✅ COMPLETE TASK
  const handleComplete = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/task/${id}`,
        { status: "Completed" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTasks(tasks.map(t => t._id === id ? res.data : t));
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ DELETE TASK
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

  return (
    <div className="bg-gray-200 min-h-screen p-6">

      <h1 className="text-2xl font-bold mb-6">Pending Tasks</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {pendingTasks.map((task) => (
          <div
            key={task._id}
            className="bg-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >

            {/* STATUS + PRIORITY */}
            <div className="flex gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                In Progress
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

              <div className="flex gap-3">
                <CheckCircle2
                  size={18}
                  className="text-green-500 cursor-pointer"
                  onClick={() => handleComplete(task._id)}
                />

                <Clock
                  size={18}
                  className="text-red-500 cursor-pointer"
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

export default PendingTasks;