import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
     <nav className="bg-indigo-600 dark:bg-indigo-700 text-white shadow-lg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl font-bold">📋 Task Tracker</span>
      </Link>

      <Link
        to="/create-task"
        className="bg-white text-indigo-700 px-4 py-2 rounded-md font-medium hover:bg-slate-100 dark:bg-slate-800 dark:text-sky-300 dark:hover:bg-slate-700 transition"
      >
        + Add Task
      </Link>
    </div>
  </div>
</nav>

      <Outlet />
    </div>
  );
}
