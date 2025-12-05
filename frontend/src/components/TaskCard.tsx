import React from "react";
import type { TaskType } from "../types/TaskType";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../reduxStore/TaskSlice";
import { toast } from "react-toastify";

const priorityClasses: Record<TaskType["priority"], string> = {
  low: "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-200",
  high: "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-200",
};

const statusClasses: Record<TaskType["status"], string> = {
  todo: "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200",
  "in-progress":
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-indigo-200",
  completed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-700 dark:text-emerald-200",
};

export default function TaskCard({ task }: { task: TaskType }) {
  const dispatch = useDispatch();
  const [deleting, setDeleting] = React.useState(false);

  const handlePriorityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const newtask = { ...task, priority: e.target.value as TaskType["priority"] };
      dispatch(updateTask(newtask));

      const res = await fetch(import.meta.env.VITE_SERVER_URL + "todo/" + newtask._id, {
        method: "PATCH",
        body: JSON.stringify(newtask),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) toast.error("Failed to update task priority");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task priority");
    }
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const newtask = { ...task, status: e.target.value as TaskType["status"] };
      dispatch(updateTask(newtask));

      const res = await fetch(import.meta.env.VITE_SERVER_URL + "todo/" + newtask._id, {
        method: "PATCH",
        body: JSON.stringify(newtask),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) toast.error("Failed to update task status");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task status");
    }
  };

  const handleDelete = async () => {
    const ok = window.confirm("Are you sure you want to delete this task?");
    if (!ok) return;
    try {
      setDeleting(true);
      const res = await fetch(import.meta.env.VITE_SERVER_URL + "todo/" + task._id, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast.error("Failed to delete task");
        return;
      }

      dispatch(deleteTask(task._id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete task");
    } finally {
      setDeleting(false);
    }
  };

  const pClass = priorityClasses[task.priority];
  const sClass = statusClasses[task.status];

  let dueDisplay = task.dueDate;
  try {
    const d = new Date(task.dueDate);
    if (!Number.isNaN(d.getTime())) dueDisplay = d.toLocaleDateString();
  } catch {}

  return (
<article className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-sm p-4 hover:shadow-md transition">
  
  {/* Title and Status */}
  <div className="flex flex-col gap-2">
    <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-rose-200 break-words">
      {task.title}
    </h3>

    <select
      value={task.status}
      onChange={handleStatusChange}
      className={`text-xs font-medium px-2 py-1 rounded cursor-pointer w-fit border-0 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-rose-400 ${sClass}`}
    >
      <option value="todo">To Do</option>
      <option value="in-progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
  </div>

  {/* Priority */}
  <div className="mt-4 flex flex-col gap-1">
    <label className="text-[11px] text-purple-700 dark:text-purple-400">Priority</label>
    <select
      value={task.priority}
      onChange={handlePriorityChange}
      className={`font-semibold px-2 py-1 rounded cursor-pointer w-fit border-0 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-rose-400 ${pClass}`}
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  </div>

  {/* Due Date */}
  <div className="mt-4 flex flex-col gap-1">
    <span className="text-[11px] sm:text-xs text-purple-700 dark:text-purple-400">Due</span>
    <time dateTime={task.dueDate} className="text-sm font-medium text-slate-900 dark:text-rose-200">
      {dueDisplay}
    </time>
  </div>

  {/* Delete Button */}
  <button
    type="button"
    onClick={handleDelete}
    disabled={deleting}
    aria-label="Delete task"
    className="mt-5 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition w-full text-center"
  >
    {deleting ? "Deleting..." : "Delete"}
  </button>

</article>

  );
}
