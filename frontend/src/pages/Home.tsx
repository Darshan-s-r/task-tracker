import { useMemo, useState } from 'react';
import useTasks from '../hooks/Tasks';
import { useSelector } from 'react-redux';
import TaskCard from '../components/TaskCard';
import type { TaskType } from '../types/TaskType';

export default function Home() {
  const tasks: TaskType[] = useSelector((state: any) => state.tasks.tasks || []);
  useTasks();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'none' | 'priority' | 'status'>('none');
  const [filterValue, setFilterValue] = useState('');

  const priorityOptions = ['low', 'medium', 'high'];
  const statusOptions = ['todo', 'in-progress', 'completed'];

  const filteredTasks = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tasks.filter((t) => {
      if (q && !t.title.toLowerCase().includes(q)) return false;
      if (filter === 'priority' && filterValue) return t.priority === filterValue;
      if (filter === 'status' && filterValue) return t.status === filterValue;
      return true;
    });
  }, [tasks, search, filter, filterValue]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-peach via-brand-coral to-brand-navy dark:bg-gradient-to-br dark:from-brand-navy dark:via-brand-purple dark:to-brand-mauve py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white dark:text-brand-peach">My Tasks</h1>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <input
              type="search"
              aria-label="Search tasks"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 rounded-md border-2 border-white/40 bg-white/90 text-slate-900 placeholder-slate-500 w-full sm:w-64"
            />

            <select
              value={filter}
              onChange={(e) => {
                const v = e.target.value as 'none' | 'priority' | 'status';
                setFilter(v);
                setFilterValue('');
              }}
              className="px-3 py-2 rounded-md border-2 border-white/40 bg-white/90 text-slate-900"
            >
              <option value="none">All</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
            </select>

            <select
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              disabled={filter === 'none'}
              className="px-3 py-2 rounded-md border-2 border-white/40 bg-white/90 text-slate-900 disabled:opacity-60"
            >
              <option value="">Any</option>
              {filter === 'priority' &&
                priorityOptions.map((p) => (
                  <option value={p} key={p}>
                    {p[0].toUpperCase() + p.slice(1)}
                  </option>
                ))}
              {filter === 'status' &&
                statusOptions.map((s) => (
                  <option value={s} key={s}>
                    {s === 'todo' ? 'To Do' : s === 'in-progress' ? 'In Progress' : 'Completed'}
                  </option>
                ))}
            </select>

            <button
              type="button"
              onClick={() => {
                setSearch('');
                setFilter('none');
                setFilterValue('');
              }}
              className="px-3 py-2 rounded-md bg-white/90 text-slate-900 font-medium"
            >
              Clear
            </button>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white dark:text-brand-coral text-lg">No tasks found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task: TaskType) => (
              <TaskCard key={(task as any)._id ?? (task as any).id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
