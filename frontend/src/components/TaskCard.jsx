import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const PRIORITY_COLORS = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
};

const CATEGORY_COLORS = {
  urgent: 'bg-orange-100 text-orange-700',
  daily: 'bg-blue-100 text-blue-700',
  work: 'bg-purple-100 text-purple-700',
};

export default function TaskCard({ task, onEdit }) {
  const { removeTask, toggleComplete } = useTasks();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {

    setDeleting(true);
    try {
      await removeTask(task._id);
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null;

  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  return (
    <div className={`bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => toggleComplete(task._id, task.completed)}
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition ${
            task.completed ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300 hover:border-indigo-400'
          }`}
        >
          {task.completed && <span className="text-white text-xs">✓</span>}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-gray-800 ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-500 mt-1 truncate">{task.description}</p>
          )}

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${PRIORITY_COLORS[task.priority]}`}>
              {task.priority}
            </span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[task.category]}`}>
              {task.category}
            </span>
            {task.dueDate && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${isOverdue ? 'bg-red-50 text-red-600 font-semibold' : 'bg-gray-100 text-gray-500'}`}>
                📅 {formatDate(task.dueDate)}{isOverdue ? ' (Overdue)' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-400 hover:text-indigo-500 p-1 rounded transition"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-gray-400 hover:text-red-500 p-1 rounded transition disabled:opacity-40"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
