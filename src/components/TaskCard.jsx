import { CheckCircle2, Clock } from "lucide-react";

function TaskCard({ task, onComplete, onDelete }) {
  const isCompleted = task.status === "Completed";

  return (
    <div className="bg-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">

      {/* STATUS */}
      <span
        className={`text-xs px-3 py-1 rounded-full ${
          isCompleted
            ? "bg-green-100 text-green-600"
            : "bg-blue-100 text-blue-600"
        }`}
      >
        {isCompleted ? "Completed" : "In Progress"}
      </span>

      {/* TITLE */}
      <h2 className="text-lg font-semibold mt-4">
        {task.title}
      </h2>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-500 mt-2">
        {task.desc}
      </p>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-6">

        <span className="text-xs bg-gray-200 px-3 py-1 rounded">
          Due: {task.due?.split("T")[0]}
        </span>

        <div className="flex gap-3">
          {!isCompleted && (
            <CheckCircle2
              size={18}
              className="text-green-500 cursor-pointer"
              onClick={() => onComplete(task._id)}
            />
          )}

          <Clock
            size={18}
            className="text-red-500 cursor-pointer"
            onClick={() => onDelete(task._id)}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskCard;