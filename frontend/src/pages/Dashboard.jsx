import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { tasks, loading, loadTasks } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
    high: tasks.filter((t) => t.priority === 'high' && !t.completed).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✅</span>
            <span className="text-xl font-bold text-gray-800">TodoList</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">Hi, {user?.name} 👋</span>
            <button
              onClick={logout}
              className="text-sm text-gray-500 hover:text-red-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:border-red-200 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total', value: stats.total, color: 'bg-indigo-50 text-indigo-700' },
            { label: 'Pending', value: stats.pending, color: 'bg-yellow-50 text-yellow-700' },
            { label: 'Completed', value: stats.completed, color: 'bg-green-50 text-green-700' },
            { label: 'High Priority', value: stats.high, color: 'bg-red-50 text-red-700' },
          ].map((s) => (
            <div key={s.label} className={`rounded-xl p-4 text-center ${s.color}`}>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs font-medium mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">My Tasks</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition"
          >
            <span className="text-lg leading-none">+</span> Add Task
          </button>
        </div>

        {/* Filters */}
        <FilterBar />

        {/* Task List */}
        {loading ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-3xl mb-3">⏳</div>
            <p>Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-lg font-medium">No tasks found</p>
            <p className="text-sm mt-1">Click "+ Add Task" to create your first task</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} onEdit={handleEdit} />
            ))}
          </div>
        )}
      </div>

      {/* Task Form Modal */}
      {showForm && <TaskForm task={editingTask} onClose={handleCloseForm} />}
    </div>
  );
}
